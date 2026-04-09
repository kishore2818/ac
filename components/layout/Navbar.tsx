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
        <button className="lg:hidden p-2 z-50" onClick={() => setMenuOpen(!menuOpen)}>
          <div className={`w-6 h-0.5 mb-1.5 transition-all bg-[var(--black)] ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-6 h-0.5 mb-1.5 transition-all bg-[var(--black)] ${menuOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-0.5 transition-all bg-[var(--black)] ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[2000] lg:hidden flex flex-col"
          >
            {/* Mobile Menu Header */}
            <div className="h-[72px] px-4 flex items-center justify-between border-b border-[var(--border)]">
              <Link href="/" onClick={() => setMenuOpen(false)}>
                <img src="/logo.png" alt="Adler Contracts" className="h-10 w-auto" />
              </Link>
              <button onClick={() => setMenuOpen(false)} className="p-2">
                <div className="w-6 h-0.5 bg-[var(--black)] rotate-45 translate-y-0.5" />
                <div className="w-6 h-0.5 bg-[var(--black)] -rotate-45 -translate-y-0.5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 flex flex-col">
              <nav className="flex flex-col gap-6 mb-12">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link 
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`block font-bebas text-4xl tracking-wider transition-colors ${pathname === link.href ? 'text-[var(--primary)]' : 'text-[var(--accent)]'}`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto space-y-6 pt-8 border-t border-[var(--border)]">
                <div>
                  <h4 className="font-rajdhani text-xs font-bold uppercase tracking-[0.2em] text-[var(--primary)] mb-2">Connect</h4>
                  <div className="space-y-1 font-inter text-[var(--gray)]">
                    <p className="text-sm">+91 90350 27395</p>
                    <p className="text-sm">Priya@adlercontracts.com</p>
                  </div>
                </div>
                
                <Link href="/contact" onClick={() => setMenuOpen(false)} className="block">
                  <button className="w-full bg-[var(--black)] text-white font-rajdhani font-bold uppercase tracking-widest py-4 rounded-sm">
                    Request a Quote
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
