import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import PageHero from '@/components/shared/PageHero'
import Link from 'next/link'
import Image from 'next/image'
import { products } from '@/data/products'

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero image="/images/page-headers/products.png" 
          title="OUR PRODUCTS" 
          subtitle="Engineered for reliability, safety, and scale. Browse our full range of custom-built electrical panels." 
        />
        <section className="bg-[var(--gray-bg)] py-12 md:py-24">
          <div className="site-container">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {products.map((product) => (
                  <div key={product.slug} className="bg-white border border-[var(--border)] rounded-[1.25rem] md:rounded-sm overflow-hidden group hover:border-[var(--primary)] transition-colors">
                    <div className="h-52 md:h-48 overflow-hidden bg-[var(--black)] relative border-b border-[var(--primary)]/10">
                       <Image 
                         src={product.image}
                         fill
                         className="object-cover group-hover:scale-105 transition-transform duration-700"
                         alt={product.name}
                         sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                       />
                       <span className="absolute top-2 right-2 bg-[var(--primary)] text-white text-[10px] font-rajdhani font-bold uppercase tracking-widest px-2 py-1 z-10">
                         {product.category}
                       </span>
                    </div>
                    <div className="p-5 md:p-6">
                      <h3 className="font-poppins md:font-rajdhani text-lg md:text-xl font-semibold md:font-bold uppercase tracking-[0.08em] md:tracking-wider mb-2">{product.name}</h3>
                      <p className="font-inter text-sm text-[var(--gray)] line-clamp-2 mb-4">{product.description}</p>
                      <Link href={`/products/${product.slug}`} className="text-[var(--primary)] font-rajdhani font-bold tracking-widest text-sm uppercase group-hover:underline">
                        View Details →
                      </Link>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
