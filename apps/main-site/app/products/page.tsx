"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Users,
  Truck,
  Building2,
  Home,
  BookOpen,
  Utensils,
  ShoppingCart,
  TrendingUp,
  ArrowRight,
  Check
} from "lucide-react"

const products = [
  {
    id: "ai-platform",
    name: "AI Platform",
    tagline: "Intelligent Business Automation",
    description: "AI-powered agents and workflows to automate your business processes. Build custom AI agents, automate workflows, and integrate with your existing tools.",
    icon: TrendingUp,
    color: "from-purple-500 to-blue-500",
    features: [
      "Custom AI Agents",
      "Workflow Automation",
      "Integration Hub",
      "Analytics Dashboard"
    ],
    status: "live",
    url: "/products/ai-platform"
  },
  {
    id: "vendornet",
    name: "VendorNet",
    tagline: "Vendor Management Made Simple",
    description: "Complete vendor relationship management system. Track vendors, manage contracts, monitor performance, and streamline procurement.",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
    features: [
      "Vendor Database",
      "Contract Management",
      "Performance Tracking",
      "Purchase Orders"
    ],
    status: "live",
    url: "/products/vendornet"
  },
  {
    id: "milkdelivery",
    name: "Milk Delivery",
    tagline: "Fresh Dairy Delivery Management",
    description: "End-to-end dairy delivery management system. Manage subscriptions, routes, customers, and payments seamlessly.",
    icon: Truck,
    color: "from-green-500 to-emerald-500",
    features: [
      "Subscription Management",
      "Route Optimization",
      "Customer Portal",
      "Payment Processing"
    ],
    status: "live",
    url: "/products/milkdelivery"
  },
  {
    id: "construction",
    name: "Construction ERP",
    tagline: "Project Management for Construction",
    description: "Complete ERP system for construction companies. Manage projects, resources, budgets, and timelines all in one place.",
    icon: Building2,
    color: "from-orange-500 to-red-500",
    features: [
      "Project Management",
      "Resource Allocation",
      "Budget Tracking",
      "Timeline Management"
    ],
    status: "live",
    url: "/products/construction"
  },
  {
    id: "realty",
    name: "Realty PMS",
    tagline: "Property Management System",
    description: "Comprehensive property management solution. Manage properties, tenants, leases, maintenance, and finances.",
    icon: Home,
    color: "from-teal-500 to-green-500",
    features: [
      "Property Listings",
      "Tenant Management",
      "Lease Tracking",
      "Maintenance Requests"
    ],
    status: "live",
    url: "/products/realty"
  },
  {
    id: "nandos",
    name: "Nandos POS",
    tagline: "Restaurant Point of Sale",
    description: "Modern POS system for Nandos restaurants. Manage orders, inventory, staff, and analytics in real-time.",
    icon: Utensils,
    color: "from-red-500 to-pink-500",
    features: [
      "Order Management",
      "Inventory Tracking",
      "Staff Management",
      "Sales Analytics"
    ],
    status: "live",
    url: "/products/nandos"
  },
  {
    id: "books",
    name: "Books Management",
    tagline: "Library & Bookstore Platform",
    description: "Complete book management system for libraries and bookstores. Catalog, track, and manage your book inventory.",
    icon: BookOpen,
    color: "from-indigo-500 to-purple-500",
    features: [
      "Book Catalog",
      "Inventory Management",
      "Member Portal",
      "Lending System"
    ],
    status: "beta",
    url: "/products/books"
  },
  {
    id: "custom",
    name: "Custom Solutions",
    tagline: "Built for Your Business",
    description: "Need something unique? We build custom SaaS solutions tailored to your exact business needs.",
    icon: ShoppingCart,
    color: "from-gray-600 to-gray-800",
    features: [
      "Custom Development",
      "Dedicated Support",
      "Scalable Architecture",
      "Full Ownership"
    ],
    status: "available",
    url: "/contact"
  }
]

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 }
}

export default function ProductsPage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Powerful SaaS Products for{" "}
              <span className="gradient-text">Every Business Need</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From AI automation to industry-specific solutions, NeurallEmpire offers a complete suite of business tools designed to scale with you.
            </p>
          </motion.div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {products.map((product, index) => {
              const Icon = product.icon
              return (
                <motion.div
                  key={product.id}
                  {...fadeInUp}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 group cursor-pointer border-2 hover:border-blue-200">
                    <CardHeader>
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${product.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>

                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="text-2xl group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </CardTitle>
                        {product.status === "beta" && (
                          <span className="px-3 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded-full">
                            BETA
                          </span>
                        )}
                        {product.status === "live" && (
                          <span className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
                            LIVE
                          </span>
                        )}
                      </div>

                      <CardDescription className="text-base font-medium text-blue-600">
                        {product.tagline}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <p className="text-gray-600 mb-6">
                        {product.description}
                      </p>

                      <div className="space-y-2 mb-6">
                        {product.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2">
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Button
                        className="w-full group/btn"
                        variant={product.id === "custom" ? "outline" : "default"}
                      >
                        {product.id === "custom" ? "Contact Us" : "Learn More"}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Choose the products you need, or let us build something custom for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-blue-600 hover:bg-gray-100 border-white"
              >
                Schedule a Demo
              </Button>
              <Button
                size="lg"
                className="bg-white/10 text-white hover:bg-white/20 border-2 border-white"
              >
                Talk to Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
