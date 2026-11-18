import createMDX from '@next/mdx'
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  async redirects() {
    return [
      {
        source: '/blog/:path*',
        destination: '/work/:path*',
        permanent: true,
      },
    ]
  },
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    // Ignore YAML frontmatter in page content. The homepage reads it via gray-matter.
    // Plugin names (rather than imported functions) also work with Turbopack.
    remarkPlugins: ['remark-frontmatter'],
  },
})

const config = (phase) =>
  withMDX({
    ...nextConfig,
    // Keep development and production output separate so a build cannot break dev.
    distDir:
      process.env.NEXT_DIST_DIR ||
      (phase === PHASE_DEVELOPMENT_SERVER ? '.next-dev' : '.next'),
  })

export default config
