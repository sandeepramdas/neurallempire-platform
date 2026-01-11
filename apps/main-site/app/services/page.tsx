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
  Clock,
  Users
} from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 }
}

const services = [
  {
    id: "crm",
    icon: Code2,
    title: "Custom CRM Systems",
    shortDesc: "Stop fighting Salesforce or paying per seat. Track relationships, pipeline, and customer data exactly how your team needs it.",
    problemStatement: "Generic CRMs like Salesforce are expensive, over-featured, and force your team into rigid workflows. Spreadsheets break down as you grow. You need a system that tracks customer relationships, pipeline, and interactions exactly how your business operates—without paying per-seat or fighting configuration limitations.",
    solution: "Fully custom CRM platforms designed around your sales process, customer lifecycle, and data needs. Track everything from initial contact through post-sale support. Automate follow-ups, manage territories, forecast revenue, and integrate with your existing tools. Built to scale from 10 users to 1,000+ without breaking.",
    features: [
      "Contact & account management tailored to your business model",
      "Custom pipeline stages matching your sales process",
      "Automated task creation and follow-up reminders",
      "Email integration and communication tracking",
      "Custom reporting and dashboards",
      "Mobile access for field teams",
      "Integration with accounting, email, and other tools"
    ],
    whoItHelps: "B2B service businesses, distributors, manufacturers, and growing companies with complex sales cycles who need more control than SaaS CRMs provide but don't want to manage technical infrastructure.",
    timeline: "10-16 weeks",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "erp",
    icon: Database,
    title: "Custom ERP & Internal Platforms",
    shortDesc: "Replace fragmented tools with one unified system for inventory, production, scheduling, and operations.",
    problemStatement: "Your operations run on a patchwork of spreadsheets, emails, and disconnected tools. Data lives in silos. Teams use different versions of the same information. Manual handoffs create delays and errors. You need one unified platform for inventory, production, scheduling, purchasing, and fulfillment.",
    solution: "Custom ERP and operations platforms that centralize business processes into one system. Inventory management, production scheduling, order tracking, vendor management, and financial integration—all built specifically for how you operate. Real-time visibility across departments without fighting enterprise software complexity.",
    features: [
      "Inventory tracking and management",
      "Production planning and scheduling",
      "Purchase order and vendor management",
      "Order fulfillment and shipping",
      "Resource allocation and capacity planning",
      "Financial integrations (QuickBooks, Xero, etc.)",
      "Role-based access and workflows"
    ],
    whoItHelps: "Manufacturers, distributors, logistics companies, and operations-heavy businesses needing better visibility and control without the cost and complexity of SAP or Oracle.",
    timeline: "14-24 weeks",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: "automation",
    icon: Workflow,
    title: "Workflow & Process Automation",
    shortDesc: "Turn repetitive tasks into automated workflows. Data entry, approvals, notifications—handled automatically.",
    problemStatement: "Your team spends hours on repetitive tasks: data entry, approval chains, report generation, follow-ups, and status updates. Manual processes create bottlenecks and inconsistency. You need automation that actually understands your business logic, not just generic integrations.",
    solution: "Custom workflow automation systems that handle repetitive tasks end-to-end. From intake forms to approval workflows to data synchronization between systems. AI-assisted routing, smart notifications, and exception handling. Built to work with your existing tools or as part of a custom platform.",
    features: [
      "Custom form builders and data intake",
      "Multi-stage approval workflows",
      "Automated notifications and reminders",
      "Document generation and distribution",
      "Data synchronization across systems",
      "Business rule engines for complex logic",
      "Audit trails and compliance tracking"
    ],
    whoItHelps: "Any business with repetitive operational tasks, approval processes, or data-heavy workflows. Especially valuable for companies spending 10+ hours per week on manual tasks.",
    timeline: "6-12 weeks",
    color: "from-orange-500 to-red-500"
  },
  {
    id: "dashboards",
    icon: BarChart3,
    title: "Management Dashboards & Reporting",
    shortDesc: "Real-time visibility into KPIs, performance, and operations. No more waiting for reports.",
    problemStatement: "You wait days or weeks for reports. Data lives in multiple systems. Creating custom views requires IT support or Excel gymnastics. Leadership can't see real-time performance. You need instant visibility into operations, financials, and KPIs.",
    solution: "Real-time dashboards that aggregate data from all your systems into clean, actionable views. Executive dashboards for leadership, operational dashboards for teams, custom views by role. Drill-down capabilities, export options, and mobile access. See what's happening right now, not what happened last week.",
    features: [
      "Real-time KPI tracking",
      "Customizable widgets and views",
      "Role-based dashboard access",
      "Drill-down and filtering",
      "Automated report generation and distribution",
      "Mobile-responsive design",
      "Export to PDF, Excel, or email"
    ],
    whoItHelps: "Leadership teams and managers needing better visibility into business performance without waiting for manual reports or fighting BI tool complexity.",
    timeline: "4-8 weeks",
    color: "from-green-500 to-emerald-500"
  },
  {
    id: "ai-systems",
    icon: Brain,
    title: "AI-Powered Decision Systems",
    shortDesc: "Forecasting, optimization, and recommendations powered by AI trained on your business data.",
    problemStatement: "You make critical decisions based on intuition, outdated reports, or manual analysis. Forecasting is guesswork. Optimization happens through trial and error. You have data but no intelligence layer to help you make better, faster decisions.",
    solution: "AI-powered systems that analyze your business data to provide forecasts, recommendations, and optimizations. Demand forecasting, pricing optimization, resource allocation, anomaly detection, and predictive maintenance. AI trained on your specific business patterns and requirements.",
    features: [
      "Demand and revenue forecasting",
      "Pricing and margin optimization",
      "Inventory level recommendations",
      "Customer behavior predictions",
      "Anomaly detection and alerts",
      "What-if scenario modeling",
      "Natural language insights (ask questions, get answers)"
    ],
    whoItHelps: "Data-rich businesses looking to move from reactive to predictive operations. Retailers, manufacturers, distributors, and service businesses with sufficient historical data.",
    timeline: "8-14 weeks",
    color: "from-indigo-500 to-blue-500"
  },
  {
    id: "digitization",
    icon: FileCode,
    title: "Process Digitization",
    shortDesc: "Move paper-based or email-based processes into clean digital workflows.",
    problemStatement: "Critical business processes still run on paper forms, email chains, and manual coordination. Information gets lost, approvals are delayed, and there's no clear audit trail. You need to digitize these processes without disrupting operations.",
    solution: "Transform manual processes into digital workflows. Custom forms, structured data capture, automated routing, and clear audit trails. Designed to match your existing process flow while adding the benefits of automation and data integrity.",
    features: [
      "Digital form creation and deployment",
      "Structured data collection",
      "Automated workflow routing",
      "Digital signature integration",
      "Complete audit trails",
      "Mobile-friendly access",
      "Integration with existing systems"
    ],
    whoItHelps: "Companies transitioning from paper-based operations, regulated industries needing compliance documentation, and businesses with complex approval chains.",
    timeline: "6-10 weeks",
    color: "from-pink-500 to-rose-500"
  }
]

export default function ServicesPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="container-custom">
          <motion.div
            initial="initial"
            animate="animate"
            variants={{
              animate: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl font-bold mb-6">
              Custom Software{" "}
              <span className="gradient-text">Development Services</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your operations with custom digital systems built specifically for your business.
              No templates, no compromises—just solutions that work the way you need them to.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="space-y-24">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="overflow-hidden border-2 hover:shadow-2xl transition-all duration-300">
                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* Left Column - Overview */}
                    <div className={`bg-gradient-to-br ${service.color} p-12 text-white`}>
                      <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6">
                        <service.icon className="w-8 h-8" />
                      </div>
                      <h2 className="text-4xl font-bold mb-4">{service.title}</h2>
                      <p className="text-lg text-white/90 mb-8">{service.shortDesc}</p>

                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Clock className="w-5 h-5 mt-1 flex-shrink-0" />
                          <div>
                            <p className="font-semibold">Typical Timeline</p>
                            <p className="text-white/80">{service.timeline}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Users className="w-5 h-5 mt-1 flex-shrink-0" />
                          <div>
                            <p className="font-semibold">Who This Helps</p>
                            <p className="text-white/80 text-sm">{service.whoItHelps}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Details */}
                    <div className="p-12">
                      <div className="mb-8">
                        <h3 className="text-xl font-bold mb-3 text-gray-900">The Problem</h3>
                        <p className="text-gray-600 leading-relaxed">{service.problemStatement}</p>
                      </div>

                      <div className="mb-8">
                        <h3 className="text-xl font-bold mb-3 text-gray-900">The Solution</h3>
                        <p className="text-gray-600 leading-relaxed">{service.solution}</p>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-4 text-gray-900">Key Features</h3>
                        <ul className="space-y-3">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-600">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Not Sure What You Need?
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Most businesses don't come to me with a clear technical specification—they come with
              business challenges. Let's discuss your specific situation and explore the right solution together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="xl" variant="gradient">
                <Link href="/contact">
                  Schedule a Discovery Call
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline">
                <Link href="/process">See How We Work</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
