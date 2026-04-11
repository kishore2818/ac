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
  const logoColor = useTransform(scrollY, [0, 80], ['var(--black)', 'var(--black)'])
  const shadow = useTransform(scrollY, [0, 80], ['0 0px 0px 0px rgba(0, 0, 0, 0)', '0 4px 20px -10px rgba(30, 58, 138, 0.1)'])
  
  const [isScrolled, setIsScrolled] = useState(false)
  
  useScroll().scrollY.on('change', (y) => setIsScrolled(y > 80))

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
      className="fixed top-0 left-0 right-0 z-[1000] h-[72px]"
    >
      <div className="w-full mx-auto px-4 md:px-6 lg:px-8 h-full flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center group z-50">
          <img 
            src="/logo.png" 
            alt="Adler Contracts" 
            className="h-10 md:h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105" 
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
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
              className="bg-[var(--primary)] text-white font-inter font-bold text-sm tracking-[0.1em] uppercase px-8 py-3 rounded-sm transition-all"
            >
              Get a Quote
            </motion.button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button aria-label="Toggle Menu" className="lg:hidden p-2 z-50" onClick={() => setMenuOpen(!menuOpen)}>
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
            className="absolute top-[72px] left-0 right-0 bg-white shadow-xl lg:hidden flex flex-col border-t border-[var(--border)] z-[999]"
          >
            <div className="p-6 flex flex-col">
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link 
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block font-rajdhani text-lg uppercase font-bold tracking-wider transition-colors ${pathname === link.href ? 'text-[var(--primary)]' : 'text-[var(--black)] hover:text-[var(--primary)]'}`}
                  >
                    {link.label}
                  </Link>
                ))}
                
                <div className="pt-4 mt-2 border-t border-gray-100">
                  <Link href="/contact" onClick={() => setMenuOpen(false)} className="block">
                    <button className="w-full bg-[var(--primary)] text-white font-rajdhani font-bold uppercase tracking-widest py-3 rounded-sm transition-colors hover:bg-[var(--primary-dark)]">
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
