import type { ComponentProps } from 'react'
import Link from 'next/link'
import { WEBSITE_URL } from '@/lib/constants'

const siteOrigin = new URL(WEBSITE_URL).origin

export function SiteLink({ href, target, rel, ...props }: ComponentProps<'a'>) {
  const url = href ? new URL(href, WEBSITE_URL) : null
  const isInternal =
    !!href && !href.startsWith('#') && url?.origin === siteOrigin
  const isExternal = !!href && /^(https?:)?\/\//i.test(href) && !isInternal
  const linkTarget = target ?? (isExternal ? '_blank' : undefined)
  const linkRel =
    linkTarget === '_blank'
      ? [rel, 'noopener', 'noreferrer'].filter(Boolean).join(' ')
      : rel

  if (isInternal && href) {
    return <Link href={href} target={linkTarget} rel={linkRel} {...props} />
  }
  return <a href={href} target={linkTarget} rel={linkRel} {...props} />
}
