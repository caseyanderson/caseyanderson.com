# Casey Anderson

Portfolio site built with Next.js, React, Tailwind CSS, and MDX. Hosted on Vercel.

## Versions

Installed locally as of 2026-11-23:

| Tool or package | Version |
| --- | --- |
| Node.js | 24.22.3 |
| npm | 11.19.1 |
| Next.js | 15.5.29 |
| React | 19.2.8 |
| Tailwind CSS | 4.3.3 |
| TypeScript | 5.9.3 |
| ESLint | 9.39.5 |

`package.json` and `package-lock.json` are the source of truth. Use Node.js 22 or 24 LTS. Run `npm ls --depth=0` for the full installed dependency list.

## Local development

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Development output goes to `.next-dev`.

Optional Turbopack dev server:

```sh
npm run dev:turbo
```

On Windows PowerShell, use `npm.cmd` in place of `npm` if needed.

## Checks

```sh
npm run lint
npm run typecheck
npm run build
```

Production preview and smoke test:

```sh
npm start -- --port 3002
npm run test:smoke -- http://localhost:3002
```

The smoke test needs a running server. It checks project pages, images, embeds, metadata, redirects, robots.txt, and sitemap.

## Content editing

See [INSTALLATION.md](./INSTALLATION.md) for project pages, images, embeds, and links.
