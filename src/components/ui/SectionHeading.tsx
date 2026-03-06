'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  className?: string
  /** Allow part of the title to be highlighted in brand color */
  highlightWord?: string
}

export default function SectionHeading({
  title,
  subtitle,
  className,
  highlightWord,
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const renderTitle = () => {
    if (!highlightWord) {
      return title
    }
    const parts = title.split(highlightWord)
    return (
      <>
        {parts[0]}
        <span className="text-brand">{highlightWord}</span>
        {parts[1] ?? ''}
      </>
    )
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn('mb-16', className)}
    >
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider uppercase text-white">
        {renderTitle()}
      </h2>
      <div className="mt-6 h-0.5 w-16 bg-brand" />
      {subtitle && (
        <p className="mt-6 text-lg text-neutral-400 max-w-2xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
