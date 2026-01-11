'use client'

import Link from 'next/link'
import {
  Brain,
  Network,
  Milk,
  Flame,
  BookOpen,
  Building,
  Home as HomeIcon,
  ArrowRight,
  ExternalLink,
} from 'lucide-react'

const products = [
  {
    name: 'AI Platform',
    slug: 'platform',
    description: 'Intelligent AI agents for automation and business intelligence',
    longDescription: 'Deploy AI-powered automation across your entire organization',
    icon: Brain,
    color: 'from-purple-500 to-indigo-600',
    href: 'https://www.neurallempire.com',
    status: 'live' as const,
    category: 'AI & Automation',
  },
  {
    name: 'VendorNet',
    slug: 'vendornet',
    description: 'End-to-end vendor and supply chain management',
    longDescription: 'Streamline procurement, vendor relationships, and supply chain operations',
    icon: Network,
    color: 'from-blue-500 to-cyan-600',
    href: 'https://vendornet.pages.dev',
    status: 'live' as const,
    category: 'Business Operations',
  },
  {
    name: 'MilkDelivery',
    slug: 'milkdelivery',
    description: 'Route optimization and subscription management for dairy delivery',
    longDescription: 'Complete dairy delivery management with route optimization and subscriptions',
    icon: Milk,
    color: 'from-green-500 to-emerald-600',
    href: '#',
    status: 'coming_soon' as const,
    category: 'Industry Solutions',
  },
  {
    name: 'Nandos Integration',
    slug: 'nandos',
    description: 'Point-of-sale and operations management for food service',
    longDescription: 'Integrated POS, inventory, and operations for restaurants',
    icon: Flame,
    color: 'from-red-500 to-orange-600',
    href: 'https://sandeepramdas.github.io/nandos-india-revamp',
    status: 'live' as const,
    category: 'Industry Solutions',
  },
  {
    name: 'Books Platform',
    slug: 'books',
    description: 'Publishing and content management for digital libraries',
    longDescription: 'End-to-end publishing workflow and digital library management',
    icon: BookOpen,
    color: 'from-yellow-500 to-amber-600',
    href: '#',
    status: 'coming_soon' as const,
    category: 'Content Management',
  },
  {
    name: 'Construction Manager',
    slug: 'construction',
    description: 'Project tracking and resource management for construction',
    longDescription: 'Complete construction project management with real-time tracking',
    icon: Building,
    color: 'from-gray-500 to-slate-600',
    href: '#',
    status: 'coming_soon' as const,
    category: 'Industry Solutions',
  },
  {
    name: 'Realty PMS',
    slug: 'realty',
    description: 'Property management system for real estate professionals',
    longDescription: 'Comprehensive property management, tenant tracking, and lease management',
    icon: HomeIcon,
    color: 'from-teal-500 to-cyan-600',
    href: 'https://realtypms.vercel.app',
    status: 'live' as const,
    category: 'Industry Solutions',
  },
]

export default function ProductsShowcase() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Our Product Ecosystem
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Industry-specific solutions powered by a unified AI platform.
            Choose the products that fit your business needs.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product) => {
            const Icon = product.icon
            const isComingSoon = product.status === 'coming_soon'

            return (
              <div
                key={product.slug}
                className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-transparent"
              >
                {/* Status Badge */}
                {isComingSoon && (
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                      Coming Soon
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${product.color} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {product.name}
                    </h3>
                  </div>
                  <p className="text-sm text-purple-600 font-semibold mb-3">
                    {product.category}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  {isComingSoon ? (
                    <span className="text-gray-500 text-sm font-medium">
                      Launching Soon
                    </span>
                  ) : (
                    <Link
                      href={product.href}
                      target={product.href.startsWith('http') ? '_blank' : undefined}
                      className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700 transition-colors group/link"
                    >
                      <span>Explore</span>
                      {product.href.startsWith('http') ? (
                        <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                      ) : (
                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      )}
                    </Link>
                  )}
                </div>

                {/* Hover Effect Border */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${product.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
              </div>
            )
          })}
        </div>

        {/* View All CTA */}
        <div className="text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl group"
          >
            View All Products
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
