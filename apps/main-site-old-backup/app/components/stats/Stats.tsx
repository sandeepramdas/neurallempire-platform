'use client';

import { Building2, ThumbsUp, Clock, TrendingUp } from 'lucide-react';

export default function Stats() {
  const stats = [
    {
      icon: Building2,
      value: '100+',
      label: 'Companies',
      description: 'Trust our solutions',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: ThumbsUp,
      value: '98%',
      label: 'Satisfaction',
      description: 'Client satisfaction rate',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Clock,
      value: '40hrs',
      label: 'Saved/Week',
      description: 'Average time saved',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: TrendingUp,
      value: '3.5x',
      label: 'ROI',
      description: 'Return on investment',
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our AI-powered solutions deliver measurable results across the food and beverage industry
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl"
                  style={{
                    backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                  }}
                />
                <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.gradient} mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="mb-2">
                    <div className="text-4xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-lg font-semibold text-gray-700">
                      {stat.label}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {stat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
