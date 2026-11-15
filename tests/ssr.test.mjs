import assert from "node:assert/strict";
import { test } from "node:test";
import { existsSync, readFileSync } from "node:fs";

const origin = process.env.SSR_TEST_ORIGIN || "http://127.0.0.1:8794";
const pages = [
  ["/", "Studio Forma — Architettura, materia, metodo", "Spazio, materia,"],
  ["/studio/", "Lo studio — Studio Forma", "Metodo prima della forma."],
  ["/servizi/", "Servizi — Studio Forma", "Tre ambiti. Un metodo di progetto."],
  [
    "/portfolio/",
    "Portfolio — Studio Forma",
    "Tre contesti. Tre trasformazioni.",
  ],
  [
    "/contatti/",
    "Contatti — Studio Forma",
    "Un confronto comincia dai dati di partenza.",
  ],
  [
    "/richiedi-un-progetto/",
    "Richiedi un progetto — Studio Forma",
    "Definire il quadro di partenza.",
  ],
  [
    "/portfolio/corte-01/",
    "Corte 01 — Studio Forma",
    "Il vuoto come elemento distributivo.",
  ],
  [
    "/portfolio/officina-02/",
    "Officina 02 — Studio Forma",
    "Una struttura esistente, un nuovo programma.",
  ],
  [
    "/portfolio/interno-03/",
    "Interno 03 — Studio Forma",
    "Abitare uno spazio, distribuire le possibilità.",
  ],
];

test("gli artefatti comprendono worker SSR e manifest client, senza homepage SSG", () => {
  assert.ok(existsSync("dist/_worker.js"));
  assert.ok(existsSync("dist/q-manifest.json"));
  assert.ok(!existsSync("dist/index.html"));
  const routes = JSON.parse(readFileSync("dist/_routes.json", "utf8"));
  assert.ok(routes.include.includes("/*"));
});

for (const [path, title, content] of pages) {
  test(`SSR HTTP diretto ${path}: contenuto e SEO senza eseguire JavaScript`, async () => {
    const response = await fetch(new URL(path, origin));
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type"), /text\/html/);
    const html = await response.text();
    const document = html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<!--[^]*?-->/g, "");
    const text = document
      .replace(/<[^>]*>/g, "")
      .replaceAll("&#39;", "'")
      .replaceAll("&#x27;", "'");
    assert.equal(
      document.match(/<title\b[^>]*>([^]*?)<\/title>/)?.[1],
      title,
      "titolo specifico",
    );
    assert.match(
      document,
      /<meta[^>]+name="description"[^>]+content="[^"]{30,}"/,
    );
    assert.match(document, /<link[^>]+rel="canonical"/);
    assert.ok(
      document.includes(new URL(path, origin).href),
      "canonical della rotta",
    );
    assert.match(document, /<html[^>]+lang="it"/);
    assert.match(document, /q:render="ssr"/);
    assert.ok(text.includes(content), "contenuto della pagina");
    assert.ok(text.includes("Sito dimostrativo."), "dichiarazione demo");
    assert.match(document, /<main[^>]+id="contenuto"/);
    assert.equal((document.match(/<h1\b/g) || []).length, 1);
    assert.ok(
      !/<(?:form|input|textarea|select)\b/.test(document),
      "nessun invio o questionario anticipato",
    );
    if (path.startsWith("/portfolio/") && path !== "/portfolio/") {
      assert.ok(
        text.includes(
          "Studio concettuale · Progetto fittizio · Non realizzato",
        ),
      );
      assert.ok(text.includes("Superficie di studio"));
      assert.ok(text.includes("Contesto"));
      assert.ok(text.includes("Tre scelte, un sistema."));
      assert.ok(text.includes("Materiali e carattere."));
      assert.ok(text.includes("Progetto interamente fittizio."));
    }
    if (path === "/portfolio/") {
      for (const slug of ["corte-01", "officina-02", "interno-03"]) {
        assert.ok(
          document.includes(`href="/portfolio/${slug}/"`),
          "scheda collegata: " + slug,
        );
      }
    }
    if (path === "/richiedi-un-progetto/") {
      assert.ok(text.includes("il questionario non è ancora attivo."));
      assert.ok(text.includes("Nessun dato è stato raccolto o generato."));
    }
  });
}

test("una rotta inesistente restituisce HTTP 404 e una via di ritorno", async () => {
  const response = await fetch(new URL("/pagina-inesistente/", origin));
  assert.equal(response.status, 404);
  const html = await response.text();
  assert.ok(html.includes("Questo spazio non c"));
  assert.ok(html.includes("Torna alla home"));
});
