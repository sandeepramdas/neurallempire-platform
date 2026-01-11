'use client'

import Link from 'next/link'
import { ArrowRight, Play, Sparkles } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          {/* Announcement Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-200 mb-8">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-900">
              Introducing AI-Powered Platform
            </span>
            <ArrowRight className="w-4 h-4 text-purple-600" />
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Build Smarter with{' '}
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              AI-Powered Solutions
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl sm:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Enterprise-grade SaaS products designed for modern industries.
            Automate operations, gain intelligence, and scale with confidence.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/products"
              className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 group"
            >
              Explore Products
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#demo"
              className="px-8 py-4 text-lg font-semibold text-gray-900 bg-white border-2 border-gray-300 rounded-lg hover:border-purple-600 hover:text-purple-600 transition-all duration-200 flex items-center gap-2 group"
            >
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Link>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-indigo-400 border-2 border-white"
                  />
                ))}
              </div>
              <span>Trusted by <strong className="text-gray-900">100+ companies</strong> worldwide</span>
            </div>
          </div>
        </div>

        {/* Hero Image/Dashboard Preview */}
        <div className="mt-20 relative">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8">
              <div className="bg-white rounded-lg shadow-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Dashboard Stats Preview */}
                  <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg p-6">
                    <div className="text-purple-600 text-sm font-semibold mb-2">AI Automation</div>
                    <div className="text-3xl font-bold text-gray-900">98%</div>
                    <div className="text-sm text-gray-600 mt-1">Accuracy Rate</div>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-lg p-6">
                    <div className="text-indigo-600 text-sm font-semibold mb-2">Time Saved</div>
                    <div className="text-3xl font-bold text-gray-900">40hrs</div>
                    <div className="text-sm text-gray-600 mt-1">Per Week Average</div>
                  </div>
                  <div className="bg-gradient-to-br from-pink-100 to-pink-50 rounded-lg p-6">
                    <div className="text-pink-600 text-sm font-semibold mb-2">ROI Increase</div>
                    <div className="text-3xl font-bold text-gray-900">3.5x</div>
                    <div className="text-sm text-gray-600 mt-1">Within 6 Months</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
