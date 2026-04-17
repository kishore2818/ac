'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services', hasDropdown: true },
  { label: 'Products', href: '/products', hasDropdown: true },
  { label: 'Projects', href: '/projects' },
  { label: 'Clients', href: '/clients' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  const { scrollY } = useScroll()
  const bg = useTransform(scrollY, [0, 80], ['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)'])
  const border = useTransform(scrollY, [0, 80], ['1px solid rgba(226, 232, 240, 0)', '1px solid rgba(226, 232, 240, 1)'])
  const shadow = useTransform(scrollY, [0, 80], ['0 0px 0px 0px rgba(0, 0, 0, 0)', '0 4px 20px -10px rgba(30, 58, 138, 0.1)'])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 28 }}
      style={{
        background: bg,
        borderBottom: border,
        boxShadow: shadow,
        backdropFilter: 'blur(12px)',
      }}
      className="fixed top-0 left-0 right-0 z-[1000] h-16 md:h-[72px]"
    >
      <div className="site-container h-full flex items-center justify-between gap-3">

        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0 group z-50">
          <img
            src="/logo.png"
            alt="Adler Contracts"
            className="h-10 md:h-12 w-auto shrink-0 object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/85 p-2 shadow-sm">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`nav-link ${pathname === link.href ? 'active' : ''}`}
            >
              {link.label}
              {link.hasDropdown && <span className="ml-1 text-[10px] opacity-50 underline-offset-4 tracking-normal transition-opacity group-hover:opacity-100">▼</span>}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:block">
          <Link href="/contact">
            <motion.button
              whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(124,179,66,0.4)', backgroundColor: 'var(--primary-dark)' }}
              whileTap={{ scale: 0.97 }}
              className="bg-[var(--primary)] text-white font-poppins font-semibold text-sm tracking-[0.16em] uppercase px-7 py-3 rounded-full transition-all"
            >
              Get a Quote
            </motion.button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button aria-label="Toggle Menu" className="lg:hidden p-2 z-50 rounded-full border border-[var(--border)] bg-white/90 shadow-sm" onClick={() => setMenuOpen(!menuOpen)}>
          <div className={`w-6 h-0.5 mb-1.5 transition-all bg-[var(--black)] ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-6 h-0.5 mb-1.5 transition-all bg-[var(--black)] ${menuOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-0.5 transition-all bg-[var(--black)] ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-xl shadow-xl lg:hidden flex flex-col border-t border-[var(--border)] z-[999]"
          >
            <div className="site-container py-5 flex flex-col gap-5">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--gray-bg)] px-4 py-3">
                <p className="font-poppins text-[11px] uppercase tracking-[0.28em] text-[var(--gray)]">Adler Contracts</p>
                <p className="mt-2 font-inter text-sm text-[var(--black-soft)]">Turnkey electrical solutions, panel systems, and industrial project execution.</p>
              </div>

              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block rounded-2xl px-4 py-3 font-poppins text-[15px] font-semibold transition-colors ${pathname === link.href ? 'bg-[var(--primary-soft)] text-[var(--primary)]' : 'text-[var(--black)] hover:bg-[var(--gray-bg)] hover:text-[var(--primary)]'}`}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="pt-4 mt-2 border-t border-gray-200">
                  <Link href="/contact" onClick={() => setMenuOpen(false)} className="block">
                    <button className="w-full bg-[var(--primary)] text-white font-poppins font-semibold tracking-[0.18em] uppercase py-3.5 rounded-2xl transition-colors hover:bg-[var(--primary-dark)]">
                      Get a Quote
                    </button>
                  </Link>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
