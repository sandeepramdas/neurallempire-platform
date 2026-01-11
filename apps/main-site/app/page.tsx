"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Code2,
  Database,
  Workflow,
  BarChart3,
  Brain,
  FileCode,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  Shield,
  TrendingUp
} from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const services = [
  {
    icon: Code2,
    title: "Custom CRM Systems",
    description: "Stop fighting Salesforce or paying per seat. Track relationships, pipeline, and customer data exactly how your team needs it.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Database,
    title: "Custom ERP & Internal Platforms",
    description: "Replace fragmented tools with one unified system for inventory, production, scheduling, and operations.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description: "Turn repetitive tasks into automated workflows. Data entry, approvals, notifications—handled automatically.",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: BarChart3,
    title: "Management Dashboards",
    description: "Real-time visibility into KPIs, performance, and operations. No more waiting for reports.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Brain,
    title: "AI-Powered Decision Systems",
    description: "Forecasting, optimization, and recommendations powered by AI trained on your business data.",
    color: "from-indigo-500 to-blue-500"
  },
  {
    icon: FileCode,
    title: "Process Digitization",
    description: "Move paper-based or email-based processes into clean digital workflows.",
    color: "from-pink-500 to-rose-500"
  }
]

const problems = [
  {
    icon: CheckCircle2,
    title: "Spreadsheets are breaking down",
    description: "Manual processes create errors, slow decisions, and frustrated teams."
  },
  {
    icon: CheckCircle2,
    title: "Generic SaaS doesn't fit",
    description: "Off-the-shelf tools force you to change your process to match their workflow."
  },
  {
    icon: CheckCircle2,
    title: "Technical debt is piling up",
    description: "Duct-taped solutions are becoming expensive and fragile."
  }
]

const whyAiFirst = [
  {
    icon: Zap,
    title: "Faster, More Efficient Development",
    description: "AI accelerates design and coding, reducing project timelines without sacrificing quality."
  },
  {
    icon: Brain,
    title: "Smarter Systems from Day One",
    description: "Built-in intelligence for automation, predictions, and optimizations."
  },
  {
    icon: TrendingUp,
    title: "Continuous Evolution",
    description: "Systems that learn and improve as your business grows."
  }
]

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container-custom relative z-10 pt-32 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                AI-First System Architecture
              </span>
            </motion.div>

            <motion.h1
              {...fadeInUp}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              Custom Digital Systems{" "}
              <span className="gradient-text">
                Designed Around How Your Business Actually Works
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto"
            >
              AI-first system architect helping business owners replace spreadsheets,
              generic SaaS, and operational chaos with custom platforms built for growth.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild size="xl" variant="gradient" className="group">
                <Link href="/contact">
                  Discuss Your Use Case
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline">
                <Link href="/process">See How It Works</Link>
              </Button>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-16 flex items-center justify-center gap-8 flex-wrap text-sm text-gray-600"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <span>Production-Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-600" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span>Scalable Architecture</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-center mb-4">
              You're Outgrowing Your Tools
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
              Your business has unique needs. Your software shouldn't force you into someone else's box.
            </motion.p>

            <div className="space-y-6">
              {problems.map((problem, index) => (
                <motion.div
                  key={problem.title}
                  variants={fadeInUp}
                  className="flex gap-6 items-start p-6 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <problem.icon className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{problem.title}</h3>
                    <p className="text-gray-600 text-lg">{problem.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-center mb-4">
              A Better Way: Systems Built for{" "}
              <span className="gradient-text">Your Business</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 text-center mb-20 max-w-3xl mx-auto">
              I design and build custom digital systems that match how your business actually operates.
              Not generic software configured to sort of work. True custom platforms engineered around
              your workflows, your data, and your growth plans.
            </motion.p>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "AI-Assisted, Human-Directed",
                  description: "AI handles complexity and automation. You retain complete control and understanding.",
                  icon: Brain
                },
                {
                  title: "Built to Evolve",
                  description: "Requirements change. Markets shift. Your systems should adapt without expensive rebuilds.",
                  icon: TrendingUp
                },
                {
                  title: "Business-First Design",
                  description: "Every technical decision is made in service of operational efficiency and business growth.",
                  icon: Shield
                }
              ].map((principle, index) => (
                <motion.div
                  key={principle.title}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-2xl transition-all duration-300 border-2 hover:border-blue-200">
                    <CardHeader>
                      <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
                        <principle.icon className="w-7 h-7 text-white" />
                      </div>
                      <CardTitle className="text-2xl">{principle.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 leading-relaxed">{principle.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What I Build Section */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-center mb-4">
              What I Build
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 text-center mb-20 max-w-2xl mx-auto">
              Custom systems for real business needs
            </motion.p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="h-full hover:shadow-2xl transition-all duration-300 group cursor-pointer">
                    <CardHeader>
                      <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <service.icon className="w-7 h-7 text-white" />
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        {service.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeInUp} className="text-center mt-12">
              <Button asChild size="lg" variant="outline">
                <Link href="/services">
                  View All Services
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why AI-First Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
        <div className="container-custom">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-center mb-4">
              Why AI-First System Design
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-blue-100 text-center mb-20 max-w-3xl mx-auto">
              AI isn't a feature I bolt onto projects. It's integrated into how I approach system architecture.
            </motion.p>

            <div className="grid md:grid-cols-3 gap-8">
              {whyAiFirst.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  variants={fadeInUp}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/20 transition-all"
                >
                  <benefit.icon className="w-12 h-12 mb-6" />
                  <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                  <p className="text-blue-100 leading-relaxed">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-bold mb-6">
              Let's Discuss Your Business Needs
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Not sure if custom development is right for you? Let's talk. I offer free discovery
              consultations to understand your challenges and explore potential solutions.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="xl" variant="gradient">
                <Link href="/contact">Book a Discovery Call</Link>
              </Button>
              <Button asChild size="xl" variant="outline">
                <Link href="/about">Learn More About Me</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
