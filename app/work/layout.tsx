import { ScrollProgress } from '@/components/ui/scroll-progress'

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="pointer-events-none fixed top-0 left-0 z-10 h-12 w-full bg-gray-100 to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)] dark:bg-zinc-950" />
      <ScrollProgress
        className="fixed top-0 z-20 h-0.5 bg-gray-300 dark:bg-zinc-600"
        springOptions={{
          bounce: 0,
        }}
      />
      <main className="prose prose-gray dark:prose-invert prose-h1:mt-12 prose-h1:mb-[1em] prose-h1:scroll-m-20 prose-h1:text-lg prose-h1:leading-7 prose-h1:font-medium prose-h2:mt-12 prose-h2:mb-[1.125em] prose-h2:scroll-m-20 prose-h2:text-base prose-h2:font-medium prose-h3:text-sm prose-h3:font-medium prose-h4:text-sm prose-h4:font-medium prose-h5:text-sm prose-h5:font-medium prose-h6:text-sm prose-h6:font-medium prose-strong:font-medium mt-24 pb-20">
        {children}
      </main>
    </>
  )
}
