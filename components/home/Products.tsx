'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import SectionLabel from '../shared/SectionLabel'
import { products } from '@/data/products'

export default function Products() {
  return (
    <section className="bg-[var(--gray-bg)] py-14 md:py-24 border-y border-[var(--border)] relative overflow-hidden">
      <div className="absolute top-0 right-0 h-96 w-96 bg-[var(--primary)]/5 blur-[100px] pointer-events-none" />

      <div className="site-container relative z-10">
        <div className="mb-8 md:mb-14 flex flex-col items-start text-left">
          <SectionLabel text="Our Products" color="accent" />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-cormorant text-4xl md:text-6xl text-[var(--accent)] tracking-wider"
          >
            High Performance <span className="text-[var(--primary)]">Panels</span>
          </motion.h2>
          <p className="mt-4 max-w-2xl font-inter text-sm md:text-base text-[var(--gray)]">
            Every product is engineered for reliability, custom site conditions, and clean maintainability, whether you need control, monitoring, automation, or power distribution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {products.slice(0, 6).map((product, index) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8, boxShadow: '0 28px 50px rgba(15,23,42,0.08)' }}
              className="section-shell overflow-hidden rounded-[1.5rem] border border-[var(--border)]"
            >
              <div className="relative h-52 md:h-56 overflow-hidden bg-[var(--gray-bg)]">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 font-poppins text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
                  {product.category}
                </div>
              </div>

              <div className="p-5 md:p-7">
                <h3 className="font-poppins text-lg md:text-xl font-semibold uppercase tracking-[0.08em] text-[var(--accent)]">
                  {product.name}
                </h3>
                <p className="mt-3 font-inter text-sm leading-relaxed text-[var(--gray)] line-clamp-3">
                  {product.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {product.features.slice(0, 2).map((feature) => (
                    <span key={feature} className="rounded-full bg-[var(--gray-bg)] px-3 py-1 font-poppins text-[11px] uppercase tracking-[0.16em] text-[var(--black-soft)]">
                      {feature}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/products/${product.slug}`}
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--gray-bg)] px-5 py-3 font-poppins text-xs font-semibold uppercase tracking-[0.18em] text-[var(--black)] transition-all duration-300 hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white"
                >
                  View Details
                  <span className="transition-transform hover:translate-x-1">→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 md:mt-12 text-left">
          <Link href="/products">
            <motion.button
              whileHover={{ y: -4, scale: 1.03, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 md:px-14 py-4 md:py-5 bg-[var(--black)] text-white font-poppins font-semibold tracking-[0.18em] uppercase rounded-full shadow-xl hover:bg-[var(--primary)] transition-all duration-500 text-sm"
            >
              Explore All Products
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  )
}
