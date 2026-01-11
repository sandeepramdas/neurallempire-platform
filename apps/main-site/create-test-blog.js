const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  'https://ktcwakkpcgiusjuhlpjy.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0Y3dha2twY2dpdXNqdWhscGp5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODExMzg4MCwiZXhwIjoyMDgzNjg5ODgwfQ.fklJJ9R_yQXTauXvKTPzjrrQSlWSU6Etdt0PIYnqvBU'
)

async function createBlogPost() {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert({
      title: 'Welcome to NeurallEmpire: Revolutionizing Business Intelligence',
      slug: 'welcome-to-neurallempire',
      excerpt: 'Discover how NeurallEmpire is transforming businesses with AI-powered solutions, intelligent automation, and cutting-edge technology.',
      content: `# Welcome to NeurallEmpire

We're excited to introduce NeurallEmpire, your partner in intelligent business solutions for the modern enterprise.

## Our Mission

At NeurallEmpire, we believe that every business deserves access to world-class AI and automation tools. Our mission is to democratize enterprise technology and make it accessible to companies of all sizes.

## What We Offer

### 1. AI Platform
Our flagship AI Platform provides comprehensive machine learning capabilities, from predictive analytics to natural language processing. Built for scale and performance.

### 2. VendorNet
Streamline your vendor management with intelligent automation. Track contracts, manage relationships, and optimize procurement—all in one place.

### 3. Smart Solutions
We offer tailored solutions for various industries:
- **Real Estate**: Property management and valuation systems
- **Construction**: Project tracking and resource optimization
- **Retail**: Inventory management and customer analytics
- **Food & Beverage**: Supply chain and delivery optimization

## Why Choose NeurallEmpire?

- ✅ **Proven Expertise**: Years of experience in AI and enterprise software
- ✅ **Scalable Solutions**: Grow from startup to enterprise seamlessly
- ✅ **24/7 Support**: Our team is always here to help
- ✅ **Cutting-Edge Tech**: Stay ahead with the latest innovations

## Get Started Today

Ready to transform your business? [Contact us](/contact) to schedule a demo and see how NeurallEmpire can help you achieve your goals.

---

*This is just the beginning. Stay tuned for more insights, case studies, and updates from the NeurallEmpire team!*`,
      author_id: '94c7e6e3-c85f-4323-9457-b7d90f66abd0',
      category: 'Company News',
      tags: ['AI', 'Automation', 'Enterprise', 'Technology'],
      published: true
    })
    .select()

  if (error) {
    console.error('Error creating blog post:', error)
  } else {
    console.log('✅ Blog post created successfully!')
    console.log('📝 Title:', data[0].title)
    console.log('🔗 Slug:', data[0].slug)
    console.log('📅 Created:', new Date(data[0].created_at).toLocaleString())
  }
}

createBlogPost()
