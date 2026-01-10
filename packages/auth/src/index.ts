// Export everything from client
export * from './client'

// Export types
export interface User {
  id: string
  email: string
  name?: string
  avatar?: string
}

export interface ProductAccess {
  productSlug: string
  organizationId: string
  role: 'owner' | 'admin' | 'member' | 'viewer'
}

export interface JWTPayload {
  sub: string // user id
  email: string
  products: ProductAccess[]
  iat?: number
  exp?: number
}
