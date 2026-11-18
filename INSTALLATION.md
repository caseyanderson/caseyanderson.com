# Editing the portfolio

For setup and local checks, see [README.md](./README.md).

## Add or edit a project

Each project lives at `app/work/<slug>/page.mdx`. The folder name becomes its URL,
for example `/work/kaos-kids`. Use lowercase, hyphen-separated names for new pages.
Keep existing slugs unchanged so old links continue to work.

```mdx
---
title: Project title
description: A short description for the homepage
order: 1
---

import { getWorkMetadata } from '@/lib/get-work'

export const metadata = getWorkMetadata('your-project-slug')

# Project title

Your content here.

## A section within the project

<Cover src="project.jpg" alt="A description of the image" />
```

Lower `order` numbers appear first on the homepage. The homepage and sitemap
automatically discover project folders; there is no separate list to maintain.
Use your folder name in `getWorkMetadata('your-project-slug')`. This exports
Next.js page metadata using the existing frontmatter title and description,
so the browser tab/search metadata and homepage list share one source.
Frontmatter is not displayed as page content.

Use one `#` heading for the project title, `##` for sections, and `###` for
subsections. Their visual sizes and spacing are controlled by
`app/work/layout.tsx`, not by the browser's default heading sizes.

## Add an image

1. Put the original in `public/images`.
2. Import it and add its filename/default alternative text to `lib/work-images.ts`.
   Follow one of the existing entries.
3. Use `<Cover src="filename.jpg" />` in the MDX page. Override the default text
   with `alt="..."` if appropriate; use `alt=""` only for decorative images.

Static imports supply the real width and height, preventing layout jumps.
Next.js generates responsive optimized images on demand; SVGs stay as SVGs.
The first request for a new optimized image may take longer than later requests.
Original files remain available under `/images/filename.jpg`.

## Embed media

```mdx
<YouTube src="https://www.youtube.com/embed/VIDEO_ID" title="Video title" />

<Vimeo src="https://player.vimeo.com/video/VIDEO_ID" title="Video title" />

<Bandcamp album="ALBUM_ID" title="Album title" />

<Bandcamp track="TRACK_ID" title="Track title" />
```

Embeds load lazily to avoid fetching every third-party player immediately.
They still need internet access, even when the site runs locally.
Every player needs a descriptive `title` identifying its content for screen
readers. Video dimensions are controlled through CSS (16:9 by default).
Bandcamp's optional `height` is a numeric pixel value, for example `height={120}`.

## Links

Normal Markdown links to internal pages use Next.js navigation in the same tab.
External HTTP(S) links open in a new tab. Section anchors, email links, and
telephone links retain normal browser behavior. Link titles and other anchor
attributes are preserved; explicit `target` values override the default.

## Before publishing

Run `npm run lint`, `npm run typecheck`, and `npm run build`.
Preview with `npm start` (or `npm start -- --port 3002` alongside development),
then run `npm run test:smoke -- http://localhost:3002`.
Check the light/dark themes and mobile layout in a browser before deployment.
