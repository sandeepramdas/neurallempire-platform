'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter, useParams } from 'next/navigation'
import { Save, Eye, Trash2 } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  published: boolean
}

export default function EditBlogPostPage() {
  const router = useRouter()
  const params = useParams()
  const postId = params.id as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [post, setPost] = useState<BlogPost | null>(null)

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Company News',
    tags: '',
    published: false,
  })

  const loadPost = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', postId)
        .single()

      if (error) {
        setError('Failed to load post')
      } else if (data) {
        setPost(data as BlogPost)
        setFormData({
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt,
          content: data.content,
          category: data.category,
          tags: data.tags?.join(', ') || '',
          published: data.published,
        })
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPost()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId])

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    })
  }

  const handleUpdate = async (publish: boolean) => {
    setSaving(true)
    setError('')

    try {
      const supabase = createClient()

      const tagsArray = formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0)

      const { error: updateError } = await supabase
        .from('blog_posts')
        .update({
          title: formData.title,
          slug: formData.slug,
          excerpt: formData.excerpt,
          content: formData.content,
          category: formData.category,
          tags: tagsArray,
          published: publish,
        })
        .eq('id', postId)

      if (updateError) {
        setError(updateError.message)
      } else {
        router.push('/admin/blog')
        router.refresh()
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return
    }

    setSaving(true)
    setError('')

    try {
      const supabase = createClient()
      const { error: deleteError } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId)

      if (deleteError) {
        setError(deleteError.message)
        setSaving(false)
      } else {
        router.push('/admin/blog')
        router.refresh()
      }
    } catch (err) {
      setError('An unexpected error occurred')
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-600">Loading post...</div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-red-600">Post not found</div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Post</h1>
          <p className="text-gray-600 mt-2">Update your blog article</p>
        </div>
        <button
          onClick={handleDelete}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}

      <form className="space-y-6">
        {/* Title */}
        <div className="bg-white rounded-lg shadow p-6">
          <label htmlFor="title" className="block text-sm font-semibold text-gray-900 mb-2">
            Title *
          </label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
            placeholder="Enter your post title"
          />
        </div>

        {/* Slug */}
        <div className="bg-white rounded-lg shadow p-6">
          <label htmlFor="slug" className="block text-sm font-semibold text-gray-900 mb-2">
            URL Slug *
          </label>
          <input
            id="slug"
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm"
            placeholder="url-slug-for-post"
          />
          <p className="text-sm text-gray-500 mt-2">
            Preview: /blog/{formData.slug || 'url-slug'}
          </p>
        </div>

        {/* Category & Tags */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <label htmlFor="category" className="block text-sm font-semibold text-gray-900 mb-2">
              Category *
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="Company News">Company News</option>
              <option value="Technology">Technology</option>
              <option value="AI & Machine Learning">AI & Machine Learning</option>
              <option value="Product Updates">Product Updates</option>
              <option value="Industry Insights">Industry Insights</option>
              <option value="Case Studies">Case Studies</option>
            </select>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <label htmlFor="tags" className="block text-sm font-semibold text-gray-900 mb-2">
              Tags
            </label>
            <input
              id="tags"
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="AI, Automation, Enterprise (comma-separated)"
            />
          </div>
        </div>

        {/* Excerpt */}
        <div className="bg-white rounded-lg shadow p-6">
          <label htmlFor="excerpt" className="block text-sm font-semibold text-gray-900 mb-2">
            Excerpt *
          </label>
          <textarea
            id="excerpt"
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            required
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            placeholder="A brief summary of your post (1-2 sentences)"
          />
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow p-6">
          <label htmlFor="content" className="block text-sm font-semibold text-gray-900 mb-2">
            Content * (Markdown supported)
          </label>
          <textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            required
            rows={20}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm resize-none"
            placeholder="Write your post content in Markdown format..."
          />
          <p className="text-sm text-gray-500 mt-2">
            Supports Markdown formatting: **bold**, *italic*, # headings, [links](url), etc.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => handleUpdate(false)}
            disabled={saving}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Saving...' : 'Save as Draft'}
          </button>
          <button
            type="button"
            onClick={() => handleUpdate(true)}
            disabled={saving}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Eye className="w-5 h-5" />
            {saving ? 'Publishing...' : formData.published ? 'Update & Publish' : 'Publish'}
          </button>
        </div>
      </form>
    </div>
  )
}
