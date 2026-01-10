'use client'

import { ArrowRight, Brain, Package, Milk, Coffee, BookOpen, Building, Home } from 'lucide-react'
import Link from 'next/link'

const products = [
  {
    name: 'AI Platform',
    slug: 'platform',
    description: 'Intelligent AI agents for automation and business intelligence',
    icon: Brain,
    color: 'from-purple-500 to-indigo-600',
    href: 'https://platform.neurallempire.com',
  },
  {
    name: 'VendorNet',
    slug: 'vendornet',
    description: 'B2B supply chain and vendor management platform',
    icon: Package,
    color: 'from-blue-500 to-cyan-600',
    href: 'https://vendornet.neurallempire.com',
  },
  {
    name: 'MilkDelivery',
    slug: 'milkdelivery',
    description: 'Route optimization and subscription management for dairy delivery',
    icon: Milk,
    color: 'from-green-500 to-emerald-600',
    href: 'https://milkdelivery.neurallempire.com',
  },
  {
    name: 'Nandos',
    slug: 'nandos',
    description: 'Restaurant operations and order management system',
    icon: Coffee,
    color: 'from-red-500 to-orange-600',
    href: 'https://nandos.neurallempire.com',
  },
  {
    name: 'Books',
    slug: 'books',
    description: 'Library and bookstore management platform',
    icon: BookOpen,
    color: 'from-yellow-500 to-amber-600',
    href: 'https://books.neurallempire.com',
  },
  {
    name: 'Construction',
    slug: 'construction',
    description: 'Project management for construction and contracting',
    icon: Building,
    color: 'from-gray-500 to-slate-600',
    href: 'https://construction.neurallempire.com',
  },
  {
    name: 'Realty',
    slug: 'realty',
    description: 'Property management and real estate operations',
    icon: Home,
    color: 'from-pink-500 to-rose-600',
    href: 'https://realty.neurallempire.com',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-blue-400" />
              <h1 className="text-2xl font-bold text-white">NeurallEmpire</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#products" className="text-white/80 hover:text-white transition">Products</a>
              <a href="#about" className="text-white/80 hover:text-white transition">About</a>
              <a href="https://platform.neurallempire.com" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
                Sign In
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Intelligent Business Solutions
          </h2>
          <p className="text-xl md:text-2xl text-white/80 mb-8">
            Unified platform powering AI, supply chain, delivery, hospitality, education, construction, and real estate operations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#products"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition inline-flex items-center justify-center"
            >
              Explore Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a
              href="https://platform.neurallempire.com"
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold transition backdrop-blur-sm"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="products" className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold text-white mb-4">Our Product Suite</h3>
          <p className="text-xl text-white/70">
            Seven specialized platforms, one unified ecosystem
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => {
            const Icon = product.icon
            return (
              <a
                key={product.slug}
                href={product.href}
                className="group relative bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all border border-white/10 hover:border-white/20"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-0 group-hover:opacity-10 rounded-xl transition`} />

                <div className="relative">
                  <div className={`bg-gradient-to-br ${product.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  <h4 className="text-xl font-bold text-white mb-2">{product.name}</h4>
                  <p className="text-white/70 text-sm mb-4">{product.description}</p>

                  <div className="flex items-center text-blue-400 text-sm font-semibold">
                    Launch
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition" />
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-white mb-6">One Platform, Infinite Possibilities</h3>
          <p className="text-xl text-white/70 mb-8">
            NeurallEmpire brings together specialized business solutions under one unified authentication system.
            Seamlessly switch between products, share data across platforms, and manage all your operations from a single account.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">7</div>
              <div className="text-white/70">Products</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">1</div>
              <div className="text-white/70">Account</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-400 mb-2">∞</div>
              <div className="text-white/70">Possibilities</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold text-white">NeurallEmpire</span>
              </div>
              <p className="text-white/60">
                Intelligent business solutions for the modern enterprise
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-4">Products</h5>
              <ul className="space-y-2">
                {products.slice(0, 4).map((product) => (
                  <li key={product.slug}>
                    <a href={product.href} className="text-white/60 hover:text-white transition">
                      {product.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-4">Company</h5>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/60 hover:text-white transition">About</a></li>
                <li><a href="#" className="text-white/60 hover:text-white transition">Contact</a></li>
                <li><a href="#" className="text-white/60 hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="text-white/60 hover:text-white transition">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/40">
            <p>&copy; 2026 NeurallEmpire. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
