import Link from 'next/link'

export function Header() {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <Link href="/" className="font-medium text-black dark:text-white">
          Casey Anderson
        </Link>
        <p className="text-zinc-600 dark:text-zinc-500">
          Musician &amp; Sound Artist, Educator, Community
          Organizer, Arts Producer, Creative Technologist
        </p>
      </div>
    </header>
  )
}
