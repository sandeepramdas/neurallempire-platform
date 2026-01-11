'use client';

import { ArrowRight, TrendingUp, TrendingDown, Building2 } from 'lucide-react';
import Link from 'next/link';

export default function CaseStudiesPreview() {
  const caseStudies = [
    {
      id: 1,
      title: 'Premium Dairy Reduces Waste by 40%',
      industry: 'Dairy',
      client: 'Premium Dairy Co.',
      description: 'How AI-powered quality control transformed production efficiency and reduced product waste across multiple facilities.',
      results: [
        { label: 'Waste Reduction', value: '40%', trend: 'down', color: 'text-green-600' },
        { label: 'Quality Score', value: '95%', trend: 'up', color: 'text-blue-600' },
        { label: 'Cost Savings', value: '$2.1M', trend: 'up', color: 'text-purple-600' },
      ],
      gradient: 'from-blue-500 to-cyan-500',
      bgPattern: 'bg-gradient-to-br from-blue-50 to-cyan-50',
    },
    {
      id: 2,
      title: 'Food Service Chain Optimizes Inventory',
      industry: 'Food Service',
      client: 'FreshServe Solutions',
      description: 'Predictive analytics and demand forecasting helped reduce spoilage while ensuring 99.8% product availability.',
      results: [
        { label: 'Spoilage Reduction', value: '65%', trend: 'down', color: 'text-green-600' },
        { label: 'Availability', value: '99.8%', trend: 'up', color: 'text-blue-600' },
        { label: 'Revenue Growth', value: '28%', trend: 'up', color: 'text-purple-600' },
      ],
      gradient: 'from-purple-500 to-pink-500',
      bgPattern: 'bg-gradient-to-br from-purple-50 to-pink-50',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real results from real clients. See how we&apos;ve helped food and beverage companies transform their operations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {caseStudies.map((study) => (
            <div
              key={study.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className={`${study.bgPattern} p-8 pb-6`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-white/90 backdrop-blur-sm`}>
                    <Building2 className="w-4 h-4 mr-1.5" />
                    {study.industry}
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${study.gradient} flex items-center justify-center`}>
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all">
                  {study.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 font-medium">
                  {study.client}
                </p>
              </div>

              <div className="p-8 pt-6">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {study.description}
                </p>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  {study.results.map((result, idx) => (
                    <div key={idx} className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        {result.trend === 'up' ? (
                          <TrendingUp className={`w-4 h-4 ${result.color} mr-1`} />
                        ) : (
                          <TrendingDown className={`w-4 h-4 ${result.color} mr-1`} />
                        )}
                        <span className={`text-2xl font-bold ${result.color}`}>
                          {result.value}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 font-medium">
                        {result.label}
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/case-studies/${study.id}`}
                  className="inline-flex items-center justify-center w-full px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors duration-200 font-semibold group"
                >
                  Read Case Study
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/case-studies"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
          >
            View All Case Studies
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
