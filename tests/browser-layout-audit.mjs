import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

// Existing Playwright Page supplied by the test host. No browser or app dependency installed.
export async function runLayoutAudit(
  page,
  { origin = "http://127.0.0.1:8794" } = {},
) {
  const output = fileURLToPath(
    new URL("../docs/evidence/4a/", import.meta.url),
  );
  await mkdir(output, { recursive: true });
  const p = await page.context().newPage();
  p.setDefaultTimeout(8000);
  const report = {
    status: "running",
    userAgent: "",
    menus: [],
    pages: [],
    contrastFailures: [],
  };
  try {
    report.userAgent = await p.evaluate(() => navigator.userAgent);
    const routes = [
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
    for (const width of [1440, 768, 390, 320]) {
      await p.setViewportSize({ width, height: 1000 });
      for (const route of routes) {
        await p.goto(origin + route, { waitUntil: "load" });
        const contrast = await p.evaluate(() => {
          const rgb = (value) => value.match(/[\d.]+/g)?.map(Number);
          const blend = (a, b) =>
            [0, 1, 2].map((i) => a[i] * (a[3] ?? 1) + b[i] * (1 - (a[3] ?? 1)));
          const lum = (color) =>
            color
              .slice(0, 3)
              .map((v) => v / 255)
              .map((v) =>
                v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4,
              )
              .reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);
          const fails = [];
          let count = 0;
          for (const el of document.querySelectorAll("body *")) {
            if (
              ![...el.childNodes].some(
                (n) => n.nodeType === 3 && n.textContent.trim(),
              ) ||
              !el.getClientRects().length ||
              el.closest("svg,noscript,script,style")
            )
              continue;
            const style = getComputedStyle(el);
            if (style.visibility === "hidden") continue;
            let background = [255, 255, 255];
            const chain = [];
            for (let node = el; node; node = node.parentElement)
              chain.unshift(node);
            for (const node of chain) {
              const value = rgb(getComputedStyle(node).backgroundColor);
              if (value) background = blend(value, background);
            }
            const foreground = blend(rgb(style.color), background);
            const a = lum(foreground),
              b = lum(background);
            const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
            const large =
              parseFloat(style.fontSize) >= 24 ||
              (parseFloat(style.fontSize) >= 18.66 &&
                parseInt(style.fontWeight) >= 700);
            count++;
            if (ratio < (large ? 3 : 4.5))
              fails.push({
                text: el.textContent.trim().slice(0, 70),
                ratio: +ratio.toFixed(2),
                color: style.color,
                background,
                size: style.fontSize,
              });
          }
          return { count, fails };
        });
        report.pages.push({ path: route, width, contrast });
        report.contrastFailures.push(
          ...contrast.fails.map((failure) => ({
            ...failure,
            path: route,
            width,
          })),
        );
        const name =
          route === "/studio/" && width === 768
            ? "studio-768"
            : route === "/servizi/" && width === 320
              ? "servizi-320"
              : route === "/contatti/" && width === 390
                ? "contatti-390"
                : "";
        if (name)
          await p.screenshot({
            path: join(output, name + ".png"),
            fullPage: true,
            scale: "css",
          });
      }
      if (width < 1000) {
        await p.goto(origin + "/");
        const toggle = p.locator(".menu-toggle");
        await toggle.focus();
        await p.keyboard.press("Enter");
        await p.waitForFunction(
          () =>
            document
              .querySelector(".menu-toggle")
              .getAttribute("aria-expanded") === "true",
        );
        await p.locator("#main-navigation").waitFor({ state: "visible" });
        await p.keyboard.press("Tab");
        const first = await p.evaluate(
          () => document.activeElement?.textContent,
        );
        await p.keyboard.press("Escape");
        await p.waitForFunction(
          () =>
            document
              .querySelector(".menu-toggle")
              .getAttribute("aria-expanded") === "false",
        );
        const escapeFocus = await toggle.evaluate(
          (el) => el === document.activeElement,
        );
        await toggle.click();
        await p
          .getByRole("navigation", {
            name: "Navigazione principale",
            exact: true,
          })
          .getByRole("link", { name: "Servizi", exact: true })
          .click();
        await p.waitForURL("**/servizi/");
        if (first !== "Home" || !escapeFocus)
          throw new Error("Mobile keyboard navigation failed at " + width);
        report.menus.push({ width, first, escapeFocus, destination: p.url() });
      }
    }
    await p.goto(origin + "/contatti/");
    const summary = p.getByText("Il percorso di richiesta è già disponibile?", {
      exact: true,
    });
    await summary.focus();
    await p.keyboard.press("Enter");
    report.faq = await summary.evaluate((el) => el.parentElement.open);
    if (!report.faq || report.contrastFailures.length)
      throw new Error("FAQ or text contrast check failed");
    report.status = "passed";
  } catch (error) {
    report.status = "failed";
    report.failure = error.message;
  } finally {
    await writeFile(
      join(output, "layout-report.json"),
      JSON.stringify(report, null, 2) + "\n",
    );
    await p.close();
  }
  return report;
}
