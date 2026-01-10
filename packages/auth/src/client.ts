import { createClient } from '@supabase/supabase-js'

if (!process.env.SUPABASE_CENTRAL_URL) {
  throw new Error('Missing SUPABASE_CENTRAL_URL environment variable')
}

if (!process.env.SUPABASE_CENTRAL_ANON_KEY) {
  throw new Error('Missing SUPABASE_CENTRAL_ANON_KEY environment variable')
}

// Client for browser/frontend use
export const supabase = createClient(
  process.env.SUPABASE_CENTRAL_URL,
  process.env.SUPABASE_CENTRAL_ANON_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
)

// Admin client for server-side use only
export const supabaseAdmin = createClient(
  process.env.SUPABASE_CENTRAL_URL,
  process.env.SUPABASE_CENTRAL_SERVICE_KEY || process.env.SUPABASE_CENTRAL_ANON_KEY
)

// Helper to get current user
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

// Helper to sign in
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) throw error
  return data
}

// Helper to sign up
export async function signUp(email: string, password: string, metadata?: Record<string, any>) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
    },
  })
  if (error) throw error
  return data
}

// Helper to sign out
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

// OAuth providers
export async function signInWithGoogle(redirectTo?: string) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: redirectTo || `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  })
  if (error) throw error
  return data
}

export async function signInWithGithub(redirectTo?: string) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: redirectTo || `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  })
  if (error) throw error
  return data
}
