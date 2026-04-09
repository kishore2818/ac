'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import SectionLabel from '../shared/SectionLabel'
import { products } from '@/data/products'

export default function Products() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  }

  // Duplicate products for seamless infinite loop
  const duplicatedProducts = [...products, ...products]

  return (
    <section className="bg-[var(--gray-bg)] py-20 md:py-32 border-y border-[var(--border)] relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--primary)]/5 blur-[100px] pointer-events-none" />
      
      <div className="w-full mx-auto px-6 md:px-12 mb-12 md:mb-16 text-center flex flex-col items-center relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
        >
          <SectionLabel text="Our Products" color="accent" />
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-bebas text-4xl md:text-7xl text-[var(--accent)] tracking-wider mt-4"
        >
          High Performance <span className="text-[var(--primary)]">Panels</span>
        </motion.h2>
      </div>

      {/* Infinite Continuous Scrolling Strip */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full overflow-hidden relative z-10 py-4"
      >
        <motion.div
          className="flex gap-6 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 40,
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          {duplicatedProducts.map((product, index) => (
            <motion.div
              key={`${product.slug}-${index}`}
              whileHover={{ y: -12, boxShadow: '0 30px 60px rgba(0,0,0,0.12)' }}
              className="shrink-0 w-[85vw] md:w-[420px] bg-white border border-[var(--border)] rounded-sm overflow-hidden group transition-all duration-500"
            >
              <div className="h-56 overflow-hidden relative border-b border-[var(--border)] bg-[var(--gray-bg)]">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                <div className="absolute top-4 left-4 bg-[var(--primary)] text-white font-rajdhani text-xs font-bold px-3 py-1 uppercase tracking-widest rounded-sm shadow-lg transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  {product.category}
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="font-rajdhani text-2xl font-bold uppercase text-[var(--accent)] mb-3 tracking-wider group-hover:text-[var(--primary)] transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="font-inter text-sm text-[var(--gray)] mb-8 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>
                
                <Link 
                  href={`/products/${product.slug}`}
                  className="inline-flex items-center text-[var(--black)] font-rajdhani uppercase tracking-widest font-bold text-sm bg-[var(--gray-bg)] px-6 py-3 border border-[var(--border)] rounded-sm group-hover:bg-[var(--primary)] group-hover:text-white group-hover:border-[var(--primary)] transition-all duration-300 group/btn"
                >
                  View Details 
                  <span className="ml-3 group-hover/btn:translate-x-2 transition-transform duration-300">→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      
      <div className="text-center mt-12 md:mt-16 relative z-10">
        <Link href="/products">
          <motion.button
            whileHover={{ y: -4, scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
            whileTap={{ scale: 0.95 }}
            className="px-14 py-5 bg-[var(--black)] text-white font-rajdhani font-bold tracking-[0.2em] uppercase rounded-sm shadow-xl hover:bg-[var(--primary)] transition-all duration-500 text-sm"
          >
            Explore All Products
          </motion.button>
        </Link>
      </div>

    </section>
  )
}
