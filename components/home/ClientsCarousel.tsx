'use client'

import { motion } from 'framer-motion'
import { clients } from '@/data/clients'

// Strict palette rotation: Green (Primary) and Blue (Accent)
const ACCENT_COLORS = [
  'var(--primary)', 'var(--accent)'
]

export default function ClientsCarousel() {
  const row1 = clients.slice(0, Math.ceil(clients.length / 2))
  const row2 = clients.slice(Math.ceil(clients.length / 2))

  const ClientChip = ({ client, idx }: { client: typeof clients[0]; idx: number }) => {
    const color = ACCENT_COLORS[idx % ACCENT_COLORS.length]
    const initials = client.name.split(' ').slice(0, 2).map(w => w[0]).join('')
    return (
      <div className="flex items-center gap-3 shrink-0 bg-white border border-[var(--border)] rounded-sm px-5 py-3 shadow-sm opacity-80 hover:opacity-100 hover:shadow-md transition-all cursor-pointer group">
        <div
          className="w-9 h-9 rounded-sm flex items-center justify-center font-bebas text-white text-base shrink-0"
          style={{ backgroundColor: `var(${color === 'var(--primary)' ? '--primary' : '--accent'})` }}
        >
          {initials}
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-rajdhani font-bold text-sm text-[var(--black)] uppercase tracking-wide group-hover:text-[var(--primary)] transition-colors whitespace-nowrap">
            {client.name}
          </span>
          <span className="font-inter text-[10px] text-[var(--black-muted)]">{client.industry}</span>
        </div>
      </div>
    )
  }

  return (
    <section className="bg-white py-24 pt-0 overflow-hidden">
      <div className="w-full mx-auto px-8 border-t border-[var(--border)] pt-24">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-bebas text-4xl text-[var(--accent)] tracking-wider">
            TRUSTED BY <span className="text-[var(--primary)]">LEADING COMPANIES</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

          {/* Row 1 – scroll left */}
          <motion.div
            animate={{ x: [0, -1920] }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className="flex whitespace-nowrap gap-5 mb-5 items-center w-max"
          >
            {[...row1, ...row1, ...row1].map((client, i) => (
              <ClientChip key={i} client={client} idx={i} />
            ))}
          </motion.div>

          {/* Row 2 – scroll right */}
          <motion.div
            initial={{ x: -1920 }}
            animate={{ x: 0 }}
            transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
            className="flex whitespace-nowrap gap-5 items-center w-max"
          >
            {[...row2, ...row2, ...row2].map((client, i) => (
              <ClientChip key={i} client={client} idx={i + 1} />
            ))}
          </motion.div>
        </div>

        <div className="text-center mt-16 font-rajdhani text-[var(--primary)] tracking-[0.2em] uppercase font-bold text-sm">
           200+ Companies across India trust Adler Contracts
        </div>

      </div>
    </section>
  )
}

