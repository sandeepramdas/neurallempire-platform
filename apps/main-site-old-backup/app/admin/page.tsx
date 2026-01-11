import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { PenSquare, FileText, Eye } from 'lucide-react'

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  // Get blog post statistics
  const { data: posts, count: totalPosts } = await supabase
    .from('blog_posts')
    .select('*', { count: 'exact' })

  const publishedPosts = posts?.filter((post) => post.published).length || 0
  const draftPosts = posts?.filter((post) => !post.published).length || 0

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your NeurallEmpire content</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Posts</p>
              <p className="text-3xl font-bold text-gray-900">{totalPosts || 0}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Published</p>
              <p className="text-3xl font-bold text-green-600">{publishedPosts}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Drafts</p>
              <p className="text-3xl font-bold text-orange-600">{draftPosts}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <PenSquare className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/admin/blog/new"
            className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-purple-600 hover:bg-purple-50 transition-all"
          >
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <PenSquare className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Create New Post</p>
              <p className="text-sm text-gray-600">Write a new blog article</p>
            </div>
          </Link>

          <Link
            href="/admin/blog"
            className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-purple-600 hover:bg-purple-50 transition-all"
          >
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Manage Posts</p>
              <p className="text-sm text-gray-600">View and edit all posts</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Posts */}
      {posts && posts.length > 0 && (
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Posts</h2>
          <div className="space-y-4">
            {posts.slice(0, 5).map((post) => (
              <div key={post.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{post.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {new Date(post.created_at).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      post.published
                        ? 'bg-green-100 text-green-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}
                  >
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                  <Link
                    href={`/admin/blog/${post.id}`}
                    className="text-purple-600 hover:text-purple-700 font-semibold text-sm"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
