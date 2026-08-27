import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the CATAPULT homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /CATAPULT/);
  assert.match(html, /UNLEASH/);
  assert.match(html, /400-0574-808/);
  assert.match(html, /音乐/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|Your site is taking shape/i);
});

test("ships the supplied brand assets and bespoke social card", async () => {
  await Promise.all([
    access(new URL("public/catapult-logo.jpg", projectRoot)),
    access(new URL("public/wechat-qr.jpg", projectRoot)),
    access(new URL("public/og.png", projectRoot)),
  ]);

  const page = await readFile(new URL("app/page.tsx", projectRoot), "utf8");
  const css = await readFile(new URL("app/globals.css", projectRoot), "utf8");
  assert.match(page, /aspect-ratio|hero-poster/);
  assert.match(page, /musicEpisodes/);
  assert.match(css, /aspect-ratio:\s*3\s*\/\s*4/);
  assert.match(css, /aspect-ratio:\s*16\s*\/\s*9/);
  assert.match(css, /grid-template-columns:\s*repeat\(3/);
  assert.match(css, /prefers-reduced-motion/);
});
