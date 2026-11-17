import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

// Accepts an existing Playwright Page; creates/closes only its own tab.
// Requires the production SSR worker at origin. No app dependency is added.
export async function runBrowserAudit(
  page,
  {
    origin = "http://127.0.0.1:8794",
    skipPublicPages = false,
    keyboardOnly = false,
  } = {},
) {
  const output = fileURLToPath(
    new URL("../docs/evidence/4a/", import.meta.url),
  );
  await mkdir(output, { recursive: true });
  const p = await page.context().newPage();
  await p.bringToFront();
  p.setDefaultTimeout(8000);
  p.setDefaultNavigationTimeout(15000);
  const report = {
    status: "running",
    origin,
    scope: keyboardOnly
      ? "keyboard-copy-reset-only"
      : skipPublicPages
        ? "questionnaire-only"
        : "public-pages-and-questionnaire",
    viewports: [],
    checks: [],
    clipboard: {},
    errors: [],
    mutations: [],
    screenshots: [],
  };
  p.on("pageerror", (error) => report.errors.push(error.message));
  p.on("request", (request) => {
    if (
      new URL(request.url()).origin === origin &&
      !["GET", "HEAD"].includes(request.method())
    )
      report.mutations.push({ method: request.method(), url: request.url() });
  });
  const check = (condition, message) => {
    if (!condition) throw new Error(message);
    report.checks.push(message);
  };
  const shot = async (name) => {
    await p.mouse.move(0, 0);
    await p.screenshot({
      path: join(output, name + ".png"),
      fullPage: true,
      scale: "css",
    });
    report.screenshots.push(name + ".png");
  };
  const go = (path) => p.goto(origin + path, { waitUntil: "load" });
  const next = () =>
    p.getByRole("button", { name: "Continua", exact: true }).click();
  const heading = (title) =>
    p.getByRole("heading", { name: title, exact: true }).waitFor();
  const invalid = (id) =>
    p.waitForFunction(
      (id) =>
        document.querySelector(id)?.getAttribute("aria-invalid") === "true",
      id,
    );
  const checkStepLayout = async (name) => {
    for (const width of [1440, 768, 390, 320]) {
      await p.setViewportSize({ width, height: 1000 });
      if (
        new URL(p.url()).origin !== origin ||
        new URL(p.url()).pathname !== "/richiedi-un-progetto/" ||
        p.viewportSize().width !== width
      )
        throw new Error("Unexpected project URL or viewport");
      check(
        await p.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        name + " fits " + width,
      );
      if (width === 390) await shot(name + "-390");
    }
    await p.setViewportSize({ width: 1440, height: 1000 });
  };
  const pages = [
    "/",
    "/studio/",
    "/servizi/",
    "/portfolio/",
    "/contatti/",
    "/richiedi-un-progetto/",
    "/portfolio/corte-01/",
    "/portfolio/officina-02/",
    "/portfolio/interno-03/",
    "/pagina-inesistente/",
  ];
  try {
    for (const width of skipPublicPages || keyboardOnly
      ? []
      : [1440, 768, 390, 320]) {
      await p.setViewportSize({ width, height: 1000 });
      for (const path of pages) {
        const response = await go(path);
        for (const image of await p.locator("img").all())
          await image.scrollIntoViewIfNeeded();
        await p.waitForFunction(() =>
          [...document.images].every(
            (image) => image.complete && image.naturalWidth > 0,
          ),
        );
        await p.evaluate(() => scrollTo(0, 0));
        const metrics = await p.evaluate(() => {
          const main = document.querySelector("main");
          return {
            width: innerWidth,
            scrollWidth: document.documentElement.scrollWidth,
            h1: document.querySelectorAll("h1").length,
            imagesLoaded: [...document.images].every(
              (image) => image.complete && image.naturalWidth > 0,
            ),
            title: document.title,
            words: main.innerText.trim().split(/\s+/).length,
            headings: [...main.querySelectorAll("h1,h2,h3")].map((node) => ({
              level: node.tagName,
              text: node.innerText,
            })),
            links: [...main.querySelectorAll("a")].map((node) => ({
              label: node.textContent.trim(),
              href: node.getAttribute("href"),
            })),
          };
        });
        check(
          response.status() === (path === "/pagina-inesistente/" ? 404 : 200),
          `HTTP ${path} at ${width}`,
        );
        check(
          metrics.scrollWidth <= metrics.width &&
            metrics.h1 === 1 &&
            metrics.imagesLoaded,
          `Layout/H1/images ${path} at ${width}`,
        );
        report.viewports.push({ path, viewport: width, ...metrics });
        if (
          (path === "/" || path === "/richiedi-un-progetto/") &&
          [1440, 390, 320].includes(width)
        )
          await shot((path === "/" ? "home-" : "brief-initial-") + width);
        if (path === "/portfolio/" && width === 1440)
          await shot("portfolio-1440");
        if (path === "/portfolio/corte-01/" && width === 390)
          await shot("project-390");
      }
    }

    await p.setViewportSize({ width: keyboardOnly ? 320 : 1440, height: 1000 });
    await go("/richiedi-un-progetto/");
    check(
      new URL(p.url()).pathname === "/richiedi-un-progetto/" &&
        new URL(p.url()).origin === origin &&
        p.viewportSize().width === (keyboardOnly ? 320 : 1440),
      "Dedicated project URL and viewport verified",
    );
    if (!keyboardOnly) {
      await p.keyboard.press("Tab");
      check(
        await p
          .getByRole("link", { name: "Vai al contenuto", exact: true })
          .evaluate((el) => el === document.activeElement),
        "Keyboard: initial Tab reaches skip link",
      );
      await p.keyboard.press("Enter");
      check(
        await p.locator("main").evaluate((el) => el === document.activeElement),
        "Keyboard: skip link focuses main",
      );
      await next();
      await p.getByRole("alert").waitFor();
      await p.waitForFunction(
        () => document.activeElement?.getAttribute("role") === "alert",
      );
      check(
        (await p.getByRole("alert").innerText()).includes(
          "Scegli la tipologia",
        ),
        "Required errors announced and focused",
      );
      await shot("brief-errors-1440");

      await p
        .getByRole("radio", { name: "Ristrutturazione", exact: true })
        .focus();
      await p.keyboard.press("Space");
      await p.waitForFunction(() =>
        document
          .querySelector('input[name="intervention"][value="renovation"]')
          .closest("label")
          .classList.contains("is-selected"),
      );
      await p.keyboard.press("ArrowRight");
      await p.waitForFunction(() =>
        document
          .querySelector('input[name="intervention"][value="new"]')
          .closest("label")
          .classList.contains("is-selected"),
      );
      check(
        await p
          .getByRole("radio", { name: "Nuova costruzione", exact: true })
          .isChecked(),
        "Keyboard: arrow changes intervention radio",
      );
      await p.keyboard.press("ArrowLeft");
      await p.waitForFunction(() =>
        document
          .querySelector('input[name="intervention"][value="renovation"]')
          .closest("label")
          .classList.contains("is-selected"),
      );
      await p.getByRole("radio", { name: "Appartamento", exact: true }).focus();
      await p.keyboard.press("Space");
      await p
        .getByLabel("Caratteristiche dell'immobile", { exact: true })
        .fill("a".repeat(9));
      await p
        .getByLabel("Superficie indicativa (m²)", { exact: true })
        .fill("95");
      await next();
      await invalid("#brief-characteristics");
      check(
        (await p
          .locator("#brief-characteristics")
          .getAttribute("aria-invalid")) === "true",
        "Characteristics minimum rejected",
      );
      await p.locator("#brief-characteristics").fill("a".repeat(400));
      await p.locator("#brief-characteristics").press("End");
      await p.keyboard.type("a");
      check(
        (await p.locator("#brief-characteristics").inputValue()).length === 400,
        "Characteristics maximum enforced",
      );
      for (const value of ["0", "-1", "100001", "1e2", "95,123"]) {
        await p.locator("#brief-surface").fill(value);
        await p.waitForFunction(
          () =>
            document
              .querySelector("#brief-surface")
              .getAttribute("aria-invalid") !== "true",
        );
        await next();
        await invalid("#brief-surface");
        check(
          (await p.locator("#brief-surface").getAttribute("aria-invalid")) ===
            "true",
          "Surface rejected: " + value,
        );
      }
      await p.locator("#brief-surface").fill("0,01");
      await next();
      await heading("Obiettivi e linguaggio.");
      await checkStepLayout("brief-goals");
      await p.getByRole("button", { name: "Indietro", exact: true }).click();
      await heading("Intervento e immobile.");
      check(
        (await p.locator("#brief-surface").inputValue()) === "0,01",
        "Small surface accepted and retained",
      );
      await p.locator("#brief-surface").fill("100000");
      await next();
      await heading("Obiettivi e linguaggio.");
      await next();
      check(
        (await p.getByRole("alert").innerText()).includes(
          "almeno un obiettivo",
        ),
        "Goals and style required",
      );
      await p
        .getByRole("checkbox", { name: "Riorganizzare gli spazi", exact: true })
        .focus();
      await p.keyboard.press("Space");
      await p
        .getByRole("checkbox", {
          name: "Integrare lavoro e abitare",
          exact: true,
        })
        .check();
      await p
        .getByRole("radio", { name: "Da esplorare insieme", exact: true })
        .check();
      await next();
      await heading("Risorse, tempi e contesto.");
      await checkStepLayout("brief-resources");
      await next();
      check(
        (await p.getByRole("alert").innerText()).includes("tempistica"),
        "Timing and description required; budget optional",
      );
      await p.getByRole("radio", { name: "Da definire", exact: true }).check();
      await p.locator("#brief-description").fill("a".repeat(19));
      await next();
      await invalid("#brief-description");
      check(
        (await p.locator("#brief-description").getAttribute("aria-invalid")) ===
          "true",
        "Description minimum rejected",
      );
      await p.locator("#brief-description").fill("a".repeat(20));
      await next();
      await heading("Rileggi le informazioni.");
      await checkStepLayout("brief-review");
      check(
        (
          await p
            .getByRole("article", { name: "Riepilogo modificabile" })
            .innerText()
        ).includes("Non indicato (facoltativo)"),
        "Budget omission accepted",
      );
      await p
        .getByRole("button", {
          name: "Modifica Intervento e immobile",
          exact: true,
        })
        .click();
      await p.locator("#brief-surface").fill("95,50");
      await p
        .locator("#brief-characteristics")
        .fill(
          "Appartamento esistente con ambienti separati e una zona giorno da riorganizzare.",
        );
      await p
        .getByRole("button", { name: "Conferma la modifica", exact: true })
        .click();
      await heading("Rileggi le informazioni.");
      check(
        (
          await p
            .getByRole("article", { name: "Riepilogo modificabile" })
            .innerText()
        ).includes("95,5 m²"),
        "Review edit retained and normalized",
      );
      await p
        .getByRole("button", {
          name: "Modifica Risorse, tempi e descrizione",
          exact: true,
        })
        .click();
      await p.locator("#brief-description").fill("a".repeat(2000));
      await p.locator("#brief-description").press("End");
      await p.keyboard.type("a");
      check(
        (await p.locator("#brief-description").inputValue()).length === 2000,
        "Description maximum enforced",
      );
      await p.locator("#brief-budget").selectOption("100to200");
      await p
        .locator("#brief-description")
        .fill(
          "Riorganizzare la zona giorno e separare lo spazio di lavoro. Il testo <script>window.__briefInjected=true</script> deve restare letterale.",
        );
      await p
        .getByRole("button", { name: "Conferma la modifica", exact: true })
        .click();
      await p
        .getByRole("button", { name: "Genera il brief", exact: true })
        .click();
      await heading("Il brief preliminare.");
      const document = await p
        .getByRole("article", { name: "Brief architettonico preliminare" })
        .innerText();
      check(
        document.includes("Ristrutturazione") &&
          document.includes("95,5 m²") &&
          document.includes("100.000–200.000 €") &&
          document.includes("DEMO / NON INVIATO"),
        "Generated document contains revised answers and demo label",
      );
      check(
        await p.evaluate(() => window.__briefInjected === undefined),
        "Description rendered as text, without script execution",
      );
      for (const width of [1440, 768, 390, 320]) {
        await p.setViewportSize({ width, height: 1000 });
        check(
          await p.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
          "Generated document fits " + width,
        );
        await shot("brief-result-" + width);
      }
      await p
        .getByRole("button", { name: "Copia il brief", exact: true })
        .click();
      await p.waitForFunction(() =>
        /Brief copiato|Copia non riuscita/.test(
          document.querySelector('[role="status"]').textContent,
        ),
      );
      report.clipboard.nativeStatus = await p.getByRole("status").innerText();
      report.clipboard.roundTripRead = false;
      await p.evaluate(() =>
        Object.defineProperty(navigator, "clipboard", {
          configurable: true,
          value: {
            writeText: async () => {
              throw new Error("Simulated denial");
            },
          },
        }),
      );
      await p
        .getByRole("button", { name: "Copia il brief", exact: true })
        .click();
      await p.locator("#brief-copy-text").waitFor();
      check(
        (await p.locator("#brief-copy-text").inputValue()).includes("95,5 m²"),
        "Manual copy contains revised document after simulated denial",
      );
      await p
        .getByRole("button", { name: "Seleziona tutto il testo", exact: true })
        .click();
      check(
        await p
          .locator("#brief-copy-text")
          .evaluate(
            (el) =>
              el === document.activeElement &&
              el.selectionStart === 0 &&
              el.selectionEnd === el.value.length,
          ),
        "Manual copy selection and focus work",
      );
      await shot("brief-copy-fallback-320");
      await p
        .getByRole("button", { name: "Ricomincia da zero", exact: true })
        .click();
      await p.waitForFunction(
        () => document.activeElement?.textContent === "Mantieni le risposte",
      );
      await p
        .getByRole("button", { name: "Mantieni le risposte", exact: true })
        .click();
      check(
        (
          await p
            .getByRole("article", { name: "Brief architettonico preliminare" })
            .innerText()
        ).includes("95,5 m²"),
        "Reset cancellation preserves document",
      );
      await p
        .getByRole("button", { name: "Ricomincia da zero", exact: true })
        .click();
      await p
        .getByRole("button", { name: "Azzera e ricomincia", exact: true })
        .click();
      await heading("Intervento e immobile.");
      check(
        (await p.locator("#brief-surface").inputValue()) === "" &&
          (await p.locator(".brief-document").count()) === 0,
        "Confirmed reset clears answers and document",
      );
      await p.locator("#brief-surface").fill("50");
      await p.reload({ waitUntil: "load" });
      check(
        (await p.locator("#brief-surface").inputValue()) === "",
        "Reload discards in-page answers as documented",
      );
    }
    const tabTo = async (selector) => {
      for (let count = 0; count < 80; count++) {
        if (
          await p.evaluate(
            (selector) => document.activeElement?.matches(selector),
            selector,
          )
        )
          return;
        await p.keyboard.press("Tab");
      }
      throw new Error("Keyboard cannot reach " + selector);
    };
    await tabTo('input[name="intervention"][value="renovation"]');
    await p.keyboard.press("Space");
    await tabTo('input[name="property"][value="apartment"]');
    await p.keyboard.press("Space");
    await tabTo("#brief-characteristics");
    await p.keyboard.type("Appartamento esistente da riorganizzare.");
    await tabTo("#brief-surface");
    await p.keyboard.type("95.50");
    await tabTo(".brief-navigation .button-dark");
    await p.keyboard.press("Enter");
    await heading("Obiettivi e linguaggio.");
    await tabTo('input[name="goals"][value="layout"]');
    await p.keyboard.press("Space");
    await tabTo('input[name="style"]');
    await p.keyboard.press("Space");
    await tabTo(".brief-navigation .button-dark");
    await p.keyboard.press("Enter");
    await heading("Risorse, tempi e contesto.");
    await tabTo("#brief-budget");
    await p.keyboard.press("ArrowDown");
    await p.keyboard.press("Tab");
    await tabTo('input[name="timing"]');
    await p.keyboard.press("Space");
    await tabTo("#brief-description");
    await p.keyboard.type("Separare lavoro e abitare nella zona giorno.");
    await tabTo(".brief-navigation .button-dark");
    await p.keyboard.press("Enter");
    await heading("Rileggi le informazioni.");
    await tabTo(".brief-navigation .button-dark");
    await p.keyboard.press("Enter");
    await heading("Il brief preliminare.");
    check(
      (await p.locator(".brief-document").innerText()).includes("95,5 m²"),
      "Keyboard-only: Tab/Space/arrows/Enter complete all four steps",
    );
    if (keyboardOnly) {
      await tabTo(".brief-result-actions .button-dark");
      await p.keyboard.press("Enter");
      await p.waitForFunction(() =>
        /Brief copiato|Copia non riuscita/.test(
          document.querySelector('[role="status"]').textContent,
        ),
      );
      report.clipboard.nativeStatus = await p.getByRole("status").innerText();
      report.clipboard.roundTripRead = false;
      await p.evaluate(() =>
        Object.defineProperty(navigator, "clipboard", {
          configurable: true,
          value: {
            writeText: async () => {
              throw new Error("Simulated denial");
            },
          },
        }),
      );
      await tabTo(".brief-result-actions .button-dark");
      await p.keyboard.press("Enter");
      await p.locator("#brief-copy-text").waitFor();
      await tabTo(".brief-manual-copy button");
      await p.keyboard.press("Enter");
      check(
        await p
          .locator("#brief-copy-text")
          .evaluate(
            (el) =>
              el === document.activeElement &&
              el.selectionStart === 0 &&
              el.selectionEnd === el.value.length &&
              el.value.includes("95,5 m²"),
          ),
        "Keyboard-only: denied clipboard exposes full selectable document",
      );
      await shot("brief-copy-fallback-320");
      await tabTo(".brief-reset-link");
      await p.keyboard.press("Enter");
      await p.waitForFunction(
        () => document.activeElement?.textContent === "Mantieni le risposte",
      );
      await p.keyboard.press("Enter");
      await p.waitForFunction(() =>
        document.activeElement?.classList.contains("brief-reset-link"),
      );
      check(
        (await p.locator(".brief-document").innerText()).includes("95,5 m²"),
        "Keyboard-only: reset cancellation preserves document and returns focus",
      );
    }
    await tabTo(".brief-reset-link");
    await p.keyboard.press("Enter");
    await p.waitForFunction(
      () => document.activeElement?.textContent === "Mantieni le risposte",
    );
    await p.keyboard.press("Tab");
    await p.keyboard.press("Enter");
    await heading("Intervento e immobile.");
    check(
      (await p.locator("#brief-surface").inputValue()) === "",
      "Keyboard-only: confirmed reset restores initial state",
    );
    if (keyboardOnly) {
      await tabTo("#brief-surface");
      await p.keyboard.type("50");
      await p.reload({ waitUntil: "load" });
      check(
        (await p.locator("#brief-surface").inputValue()) === "",
        "Reload discards in-page answers",
      );
    }
    check(
      report.mutations.length === 0,
      "No non-GET/HEAD requests during browser audit",
    );
    check(report.errors.length === 0, "No pageerror during browser audit");
    report.status = "passed";
  } catch (error) {
    report.status = "failed";
    report.failure = { message: error.message, url: p.url() };
    await shot("failure").catch(() => {});
  } finally {
    await writeFile(
      join(
        output,
        keyboardOnly ? "keyboard-report.json" : "browser-report.json",
      ),
      JSON.stringify(report, null, 2) + "\n",
    );
    await p.close();
  }
  return {
    status: report.status,
    checks: report.checks.length,
    viewports: report.viewports.length,
    failure: report.failure,
    clipboard: report.clipboard,
    errors: report.errors,
    screenshots: report.screenshots,
  };
}
