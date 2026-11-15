import { createDOM } from "@builder.io/qwik/testing";
import { QwikCityMockProvider } from "@builder.io/qwik-city";
import { expect, test } from "vitest";
import { Header } from "./header";

test("la navigazione espone tutte le rotte pubbliche e la pagina corrente", async () => {
  const { screen, render } = await createDOM();
  await render(
    <QwikCityMockProvider url="https://studio-forma.example/studio/">
      <Header />
    </QwikCityMockProvider>,
  );
  const nav = screen.querySelector("nav")!;
  expect(
    Array.from(nav.querySelectorAll("a")).map((link) =>
      link.getAttribute("href"),
    ),
  ).toEqual([
    "/",
    "/studio/",
    "/servizi/",
    "/portfolio/",
    "/contatti/",
    "/richiedi-un-progetto/",
  ]);
  expect(nav.querySelector('[aria-current="page"]')?.textContent).toBe(
    "Studio",
  );
});

test("il menu mobile aggiorna aria-expanded e si chiude alla selezione", async () => {
  const { screen, render, userEvent } = await createDOM();
  await render(
    <QwikCityMockProvider>
      <Header />
    </QwikCityMockProvider>,
  );
  const button = screen.querySelector("button")!;
  expect(button.getAttribute("aria-expanded")).toBe("false");
  await userEvent("button", "click");
  expect(button.getAttribute("aria-expanded")).toBe("true");
  expect(screen.querySelector("nav")?.className).toContain("is-open");
  await userEvent('nav a[href="/studio/"]', "click");
  expect(button.getAttribute("aria-expanded")).toBe("false");
});
