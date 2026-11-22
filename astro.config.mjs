// @ts-check
import { copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { REDIRECTS } from './src/data/legacy.ts';
import { normalizeBase, rebaseDist } from './scripts/rebase-dist.mjs';

const SITE = 'https://lunawolfstudios.com';

/**
 * Preview mode. Before the custom domain is attached, GitHub Pages serves this repository at
 * https://<owner>.github.io/<repo>/. The deploy workflow reads that address from
 * actions/configure-pages and passes it in: SITE_BASE="/WebsiteLunaWolfStudios" and
 * SITE_ORIGIN="https://lunawolfstudios.github.io". Once the domain is set in Settings > Pages
 * the same step passes an empty base, and the build is the production build again.
 * With SITE_BASE unset or empty (`npm run build`, CI, local work) nothing here changes.
 */
const BASE = normalizeBase(process.env.SITE_BASE);
const PREVIEW_ORIGIN = (process.env.SITE_ORIGIN ?? '').replace(/\/+$/, '');
if (BASE && !PREVIEW_ORIGIN) throw new Error('SITE_BASE is set, so SITE_ORIGIN must be too (for example https://lunawolfstudios.github.io).');

/** Paths that exist in the build but are not destinations, so the sitemap leaves them out. */
const UNLISTED = new Set([
  ...Object.keys(REDIRECTS).map((from) => `${SITE}${BASE}${from}/`),
  `${SITE}${BASE}/404/`,
  `${SITE}${BASE}/styleguide/`,
]);

/**
 * Preview builds only: the site's hand-written root-relative links and its production
 * absolute URLs move under the base and onto the preview origin (scripts/rebase-dist.mjs).
 * Listed last, so it sees the sitemap copy and the pruned _astro/ folder.
 */
const previewRebase = {
  name: 'lws:preview-rebase',
  hooks: {
    /** @param {{ dir: URL, logger: { info: (msg: string) => void } }} options */
    'astro:build:done': async ({ dir, logger }) => {
      await rebaseDist({ dir: fileURLToPath(dir), base: BASE, origin: PREVIEW_ORIGIN, site: SITE, log: (m) => logger.info(m) });
    },
  },
};

/**
 * The WordPress site advertised /sitemap.xml (robots.txt and Search Console still point
 * there), while @astrojs/sitemap writes sitemap-index.xml. Copy the index to the old name
 * once the build is done so both URLs answer.
 */
const legacySitemap = {
  name: 'lws:legacy-sitemap',
  hooks: {
    /** @param {{ dir: URL, logger: { info: (msg: string) => void } }} options */
    'astro:build:done': async ({ dir, logger }) => {
      const from = fileURLToPath(new URL('sitemap-index.xml', dir));
      const to = fileURLToPath(new URL('sitemap.xml', dir));
      await copyFile(from, to);
      logger.info('sitemap-index.xml copied to sitemap.xml');
    },
  },
};

/**
 * src/lib/images.ts resolves data-file image names through an eager glob of src/assets/, so
 * every image there is imported, and Astro emits each original into dist/_astro/ even when
 * no page renders it (it only cleans up originals of images it optimized). After the build,
 * delete any image in dist/_astro/ that no HTML, CSS, JS or XML file mentions. Pages only
 * ship what they reference; nothing referenced is ever touched.
 */
const pruneUnusedAssets = {
  name: 'lws:prune-unused-assets',
  hooks: {
    /** @param {{ dir: URL, logger: { info: (msg: string) => void } }} options */
    'astro:build:done': async ({ dir, logger }) => {
      const { readdir, readFile, stat, unlink } = await import('node:fs/promises');
      const path = await import('node:path');
      const root = fileURLToPath(dir);
      const assetsDir = path.join(root, '_astro');
      const files = await readdir(root, { recursive: true });
      let text = '';
      for (const f of files) {
        if (/\.(html|css|js|mjs|xml|json|webmanifest|txt)$/i.test(f)) text += await readFile(path.join(root, f), 'utf8');
      }
      let removed = 0;
      let bytes = 0;
      for (const f of await readdir(assetsDir)) {
        if (!/\.(png|jpe?g|gif|webp|avif|svg)$/i.test(f)) continue;
        if (text.includes(`/_astro/${f}`)) continue;
        const full = path.join(assetsDir, f);
        bytes += (await stat(full)).size;
        await unlink(full);
        removed++;
      }
      logger.info(`removed ${removed} unreferenced image file(s) from _astro/ (${(bytes / 1048576).toFixed(1)} MB)`);
    },
  },
};

// https://astro.build
export default defineConfig({
  site: SITE,
  // Only in a github.io preview build; absent (the root) in production.
  ...(BASE ? { base: BASE } : {}),
  // Every URL ends in a slash, matching the WordPress permalinks the web already links to.
  trailingSlash: 'always',
  build: {
    format: 'directory',
    // One HTML request per page: no render-blocking stylesheet round trip.
    inlineStylesheets: 'always',
  },
  // Hovering a link starts fetching its page, so the click lands on a warm cache.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  // Old WordPress URLs. Static builds emit an instant meta-refresh page with a canonical to
  // the target and noindex, which is all GitHub Pages can serve. Table: src/data/legacy.ts.
  redirects: REDIRECTS,
  integrations: [
    sitemap({
      filter: (page) => !UNLISTED.has(page),
    }),
    legacySitemap,
    pruneUnusedAssets,
    ...(BASE ? [previewRebase] : []),
  ],
});
