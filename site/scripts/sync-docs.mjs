// Pulls the project's root markdown (CHANGELOG, docs/*.md…) into the Starlight
// content collection at build time. The engine lives in @onury/docs-kit; this
// file just declares WHICH files map to WHICH in-site pages. Add/remove entries
// freely (and update the sidebar in astro.config.mjs to match).
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { syncDocs } from '@onury/docs-kit/sync';

const here = dirname(fileURLToPath(import.meta.url));

syncDocs({
  root: resolve(here, '../..'),       // project root (one level above site/)
  outDir: resolve(here, '../src/content/docs'),
  base: '/notation',
  files: [
    {
      "src": "CHANGELOG.md",
      "out": "changelog.md",
      "title": "Changelog",
      "description": "Release history — notable changes across versions."
    }
  ]
});
