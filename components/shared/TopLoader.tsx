'use client'

import { useEffect, useState, useRef, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

function TopLoaderBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const isNavigatingRef = useRef(false)

  const clearTimers = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  const startProgress = () => {
    clearTimers()
    isNavigatingRef.current = true
    setVisible(true)
    setProgress(15)

    const crawl = (current: number) => {
      timerRef.current = setTimeout(() => {
        if (!isNavigatingRef.current) return
        let next = current
        if (current < 50) {
          next += Math.random() * 20 + 10
        } else if (current < 80) {
          next += Math.random() * 10 + 5
        } else if (current < 95) {
          next += Math.random() * 3 + 1
        }
        if (next > 95) next = 95
        setProgress(next)
        crawl(next)
      }, 250)
    }

    crawl(15)
  }

  const completeProgress = () => {
    clearTimers()
    isNavigatingRef.current = false
    setProgress(100)

    timerRef.current = setTimeout(() => {
      setVisible(false)
      timerRef.current = setTimeout(() => {
        setProgress(0)
      }, 200)
    }, 250)
  }

  // Complete progress on route/search changes
  useEffect(() => {
    if (isNavigatingRef.current) {
      completeProgress()
    }
  }, [pathname, searchParams])

  // Global link interception and events
  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey
      ) {
        return
      }

      const target = event.target as HTMLElement | null
      const anchor = target?.closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href || href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:')) {
        return
      }

      if (anchor.target && anchor.target !== '_self') {
        return
      }

      try {
        const url = new URL(href, window.location.href)
        if (url.origin !== window.location.origin) {
          return
        }

        const currentUrl = new URL(window.location.href)
        if (url.pathname === currentUrl.pathname && url.search === currentUrl.search) {
          return
        }

        startProgress()
      } catch {
        // invalid URL, ignore
      }
    }

    const handlePopState = () => {
      startProgress()
    }

    const handleCustomLoading = (e: Event) => {
      const customEvent = e as CustomEvent<{ active?: boolean }>
      if (customEvent.detail?.active) {
        startProgress()
      } else {
        completeProgress()
      }
    }

    document.addEventListener('click', handleAnchorClick, { capture: true })
    window.addEventListener('popstate', handlePopState)
    window.addEventListener('adler-loading', handleCustomLoading as EventListener)
    window.addEventListener('ricoz-network-activity', handleCustomLoading as EventListener)

    return () => {
      clearTimers()
      document.removeEventListener('click', handleAnchorClick, { capture: true })
      window.removeEventListener('popstate', handlePopState)
      window.removeEventListener('adler-loading', handleCustomLoading as EventListener)
      window.removeEventListener('ricoz-network-activity', handleCustomLoading as EventListener)
    }
  }, [])

  if (!visible && progress === 0) return null

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[99999] pointer-events-none transition-opacity duration-200"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div
        className="h-[3px] bg-[var(--primary)] transition-all duration-300 ease-out relative"
        style={{
          width: `${progress}%`,
          boxShadow: '0 0 10px var(--primary), 0 0 5px var(--primary)',
        }}
      >
        <div
          className="absolute right-0 top-0 h-full w-24 opacity-100 pointer-events-none"
          style={{
            boxShadow: '0 0 12px var(--primary), 0 0 6px var(--primary)',
            transform: 'rotate(3deg) translate(0px, -4px)',
          }}
        />
      </div>
    </div>
  )
}

export default function TopLoader() {
  return (
    <Suspense fallback={null}>
      <TopLoaderBar />
    </Suspense>
  )
}
