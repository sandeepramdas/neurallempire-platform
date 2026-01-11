import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { PenSquare, Eye, EyeOff, Calendar, FileText } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  published: boolean
  created_at: string
  updated_at: string
}

export default async function BlogManagementPage() {
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })

  const blogPosts = (posts || []) as BlogPost[]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-gray-600 mt-2">Manage all your blog content</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all"
        >
          <PenSquare className="w-5 h-5" />
          New Post
        </Link>
      </div>

      {blogPosts.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No blog posts yet</h3>
          <p className="text-gray-600 mb-6">Get started by creating your first blog post</p>
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all"
          >
            <PenSquare className="w-5 h-5" />
            Create First Post
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {blogPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-semibold text-gray-900">{post.title}</div>
                        <div className="text-sm text-gray-500 mt-1 line-clamp-1">{post.excerpt}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
                          post.published
                            ? 'bg-green-100 text-green-700'
                            : 'bg-orange-100 text-orange-700'
                        }`}
                      >
                        {post.published ? (
                          <>
                            <Eye className="w-4 h-4" />
                            Published
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-4 h-4" />
                            Draft
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-3">
                        {post.published && (
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm"
                          >
                            View
                          </Link>
                        )}
                        <Link
                          href={`/admin/blog/${post.id}`}
                          className="text-purple-600 hover:text-purple-700 font-semibold text-sm"
                        >
                          Edit
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
