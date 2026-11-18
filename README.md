# Casey Anderson

Personal portfolio built with Next.js 15, React 19, Tailwind CSS 4, and MDX.
Hosted on Vercel.

## Local development

Use Node.js 22 or 24 LTS and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Development uses Webpack, the compatible default for
this project. To compare Turbopack locally, stop the server and try
`npm run dev:turbo`. Both support the MDX pages; neither is guaranteed faster
on every machine or on a first compile.
Restart the server after updating dependencies or changing the Next.js config.

Development compiles pages on demand, so the first visit is slower than repeat
visits. It also includes debugging tools that aren't shipped to visitors.
`node_modules` contains installed dependencies; `.next-dev` and `.next` are
generated output. None should be committed.

## Checks and production preview

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

If development is still using port 3000, preview production on another port:

```sh
npm start -- --port 3002
npm run test:smoke -- http://localhost:3002
```

Development output (`.next-dev`) and production output (`.next`) are separate,
so building does not overwrite the development server's files.
The smoke test checks all project pages, local images, embeds, redirects,
robots.txt, and the sitemap. It requires a running server.

## Editing content

See [INSTALLATION.md](./INSTALLATION.md) for the content workflow.

- `app/work/<slug>/page.mdx`: project content and homepage metadata.
- `app/data.ts`: email and social links.
- `app/personal.tsx`: server-rendered homepage content.
- `mdx-components.tsx`: shared images and media embeds.
- `lib/work-images.ts`: image imports, dimensions, and default alternative text.
- `lib/constants.ts`: public website URL used in metadata and the sitemap.
- `components/ui`: interactive hover and scroll effects.

Pages are statically generated at build time. Publishing changes to Vercel
requires a new deployment; running or testing locally does not deploy anything.
Pushing to the production-connected branch may trigger a Vercel deployment.

## Credits

Originally based on [Nim](https://github.com/ibelick/nim) by ibelick,
with interactive components adapted from
[Motion-Primitives](https://motion-primitives.com/).
