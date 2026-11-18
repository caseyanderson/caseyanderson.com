'use client'

import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const OPTIONS = [
  { label: 'Light', id: 'light', icon: SunIcon },
  { label: 'Dark', id: 'dark', icon: MoonIcon },
  { label: 'System', id: 'system', icon: MonitorIcon },
]

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Reserve the controls' space without rendering a mismatched server theme.
  if (!mounted) return <div className="h-7 w-[84px]" />

  return (
    <div className="flex">
      {OPTIONS.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-zinc-500 transition-colors duration-100 focus-visible:outline-2 aria-pressed:bg-zinc-100 aria-pressed:text-zinc-950 dark:text-zinc-400 dark:aria-pressed:bg-zinc-800 dark:aria-pressed:text-zinc-50"
          type="button"
          aria-label={`Switch to ${label} theme`}
          aria-pressed={theme === id}
          onClick={() => setTheme(id)}
        >
          <Icon className="h-4 w-4" />
        </button>
      ))}
    </div>
  )
}
