// @ts-check
// Per-project Astro + Starlight config. The shared THEME comes from
// @onury/docs-kit via the CSS string paths in `customCss` below.
//
// NOTE: do NOT `import` from @onury/docs-kit here. It is ESM-only, and importing
// it into the Astro config makes Vite externalize @astrojs/starlight and load its
// TypeScript entry under Node, which fails on Node >=22.18.
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { unified } from '@astrojs/markdown-remark';
import { createStarlightTypeDocPlugin } from 'starlight-typedoc';

const [starlightTypeDoc, typeDocSidebarGroup] = createStarlightTypeDocPlugin();

/**
 * Drops the auto-generated `## Constructors` heading from the TypeDoc API
 * pages (each class has a single constructor, so the title is noise).
 */
function remarkDropConstructorsHeading() {
  return (/** @type {any} */ tree) => {
    tree.children = tree.children.filter(
      (/** @type {any} */ node) =>
        !(
          node.type === 'heading' &&
          node.depth === 2 &&
          node.children?.length === 1 &&
          node.children[0].value === 'Constructors'
        )
    );
  };
}

export default defineConfig({
  site: 'https://onury.io',
  base: "/notation",
  markdown: { processor: unified({ remarkPlugins: [remarkDropConstructorsHeading] }) },
  integrations: [
    starlight({
      title: "Notation",
      logo: { src: './src/assets/notation-logo.svg', replacesTitle: true },
      description: "Utility for modifying / processing the contents of Javascript objects or arrays via object notation strings or globs.",
      social: [{ icon: 'github', label: 'GitHub', href: "https://github.com/onury/notation" }],
      components: { Head: '@onury/docs-kit/components/Head.astro' },
      customCss: [
        '@onury/docs-kit/styles/custom.css',
        '@onury/docs-kit/styles/theme.css',
        './src/styles/overrides.css',
        './src/styles/hero.css'
      ],
      plugins: [
        starlightTypeDoc({
          entryPoints: ['../src/index.ts'],
          tsconfig: '../tsconfig.build.json',
          output: 'api',
          sidebar: { label: 'API Reference', collapsed: false },
          typeDoc: { githubPages: false, excludeInternal: true, sort: ['source-order'] }
        })
      ],
      sidebar: [
        {
          label: 'Start Here',
          items: [
            { label: 'Getting Started', slug: 'getting-started' },
            { label: "What's New in v3", slug: 'whats-new' }
          ]
        },
        {
          label: 'Concepts',
          items: [
            { label: 'Notations & Notes', slug: 'concepts/notations' },
            { label: 'Object, Bracket & Array Syntax', slug: 'concepts/syntax' },
            { label: 'Reading & Inspecting', slug: 'concepts/reading' },
            { label: 'Modifying Data', slug: 'concepts/modifying' },
            { label: 'Flatten & Expand', slug: 'concepts/restructuring' },
            { label: 'Moving & Copying', slug: 'concepts/moving' },
            { label: 'Glob Notation', slug: 'concepts/globs' },
            { label: 'Filtering Data', slug: 'concepts/filtering' },
            { label: 'Data Integrity', slug: 'concepts/integrity' },
            { label: 'Mutation & Cloning', slug: 'concepts/mutation' },
            { label: 'Options, Strict Mode & Errors', slug: 'concepts/options' }
          ]
        },
        {
          label: 'Guides',
          items: [
            { label: 'Best Practices', slug: 'best-practices' },
            { label: 'Recipes', slug: 'guides/recipes' }
          ]
        },
        {
          label: 'Help',
          items: [
            { label: 'FAQ', slug: 'faq' },
            { label: 'Changelog', slug: 'changelog' }
          ]
        },
        typeDocSidebarGroup
      ]
    })
  ]
});
