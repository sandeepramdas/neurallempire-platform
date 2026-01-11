'use client';

import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'VP of Operations',
      company: 'Premium Dairy Co.',
      initials: 'SJ',
      gradient: 'from-blue-500 to-cyan-500',
      testimonial: 'NeurallEmpire transformed our quality control process. We reduced waste by 35% in the first quarter and improved product consistency across all our facilities. The AI-powered insights are game-changing.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Chief Technology Officer',
      company: 'FreshServe Solutions',
      initials: 'MC',
      gradient: 'from-purple-500 to-pink-500',
      testimonial: 'The predictive analytics have revolutionized our inventory management. We can now anticipate demand with incredible accuracy, reducing spoilage and ensuring our customers always get the freshest products.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Quality Director',
      company: 'Artisan Foods Group',
      initials: 'ER',
      gradient: 'from-orange-500 to-red-500',
      testimonial: 'Implementation was seamless and the ROI was immediate. The team at NeurallEmpire understood our unique challenges and delivered a solution that exceeded our expectations. Highly recommended!',
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what industry leaders have to say about working with NeurallEmpire
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-gray-200" />

              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                &ldquo;{testimonial.testimonial}&rdquo;
              </p>

              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${testimonial.gradient} flex items-center justify-center text-white font-semibold flex-shrink-0`}>
                  {testimonial.initials}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
