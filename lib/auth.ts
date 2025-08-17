import { createClient } from '@/lib/supabase/client'
import type { UserProfile, RegistrationStep1 } from '@/lib/types'

export class AuthService {
  private supabase = createClient()

  async signUp(userData: RegistrationStep1) {
    // Hash password (in production, use proper bcrypt)
    const passwordHash = btoa(userData.password) // Simple base64 encoding for demo
    
    const { data, error } = await this.supabase
      .from('user_profiles')
      .insert({
        first_name: userData.first_name,
        surname: userData.surname,
        email: userData.email,
        password_hash: passwordHash,
        registration_step: 1
      })
      .select()
      .single()

    if (error) throw error
    
    // Store user session in localStorage
    if (data) {
      localStorage.setItem('tanish_bilish_user', JSON.stringify({
        id: data.id,
        email: data.email,
        first_name: data.first_name,
        surname: data.surname
      }))
    }
    
    return { user: data }
  }

  async signIn(email: string, password: string) {
    const passwordHash = btoa(password) // Simple base64 encoding for demo
    
    const { data, error } = await this.supabase
      .from('user_profiles')
      .select('*')
      .eq('email', email)
      .eq('password_hash', passwordHash)
      .eq('is_active', true)
      .single()

    if (error || !data) {
      throw new Error('Invalid email or password')
    }

    // Update last login
    await this.supabase
      .from('user_profiles')
      .update({ last_login: new Date().toISOString() })
      .eq('id', data.id)

    // Store user session in localStorage
    localStorage.setItem('tanish_bilish_user', JSON.stringify({
      id: data.id,
      email: data.email,
      first_name: data.first_name,
      surname: data.surname
    }))

    return { user: data }
  }

  async signOut() {
    localStorage.removeItem('tanish_bilish_user')
  }

  async getCurrentUser() {
    const userStr = localStorage.getItem('tanish_bilish_user')
    if (!userStr) return null
    
    try {
      return JSON.parse(userStr)
    } catch {
      return null
    }
  }

  async getUserProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await this.supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      console.error('Error fetching user profile:', error)
      return null
    }
    return data
  }

  async updateUserProfile(userId: string, updates: Partial<UserProfile>) {
    const { data, error } = await this.supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async updateRegistrationStep(userId: string, step: number) {
    const { error } = await this.supabase
      .from('user_profiles')
      .update({ registration_step: step })
      .eq('id', userId)

    if (error) throw error
  }

  async completeRegistration(userId: string) {
    const { error } = await this.supabase
      .from('user_profiles')
      .update({ 
        registration_step: 5,
        profile_completed: true 
      })
      .eq('id', userId)

    if (error) throw error
  }

  async getTechnologies() {
    const { data, error } = await this.supabase
      .from('technologies')
      .select('*')
      .order('category', { ascending: true })
      .order('name', { ascending: true })

    if (error) throw error
    return data || []
  }

  async addUserTechnologies(userId: string, technologyIds: string[]) {
    const userTechnologies = technologyIds.map(techId => ({
      user_id: userId,
      technology_id: techId
    }))

    const { error } = await this.supabase
      .from('user_technologies')
      .upsert(userTechnologies)

    if (error) throw error
  }

  async removeUserTechnologies(userId: string) {
    const { error } = await this.supabase
      .from('user_technologies')
      .delete()
      .eq('user_id', userId)

    if (error) throw error
  }

  async getProvinces() {
    const { data, error } = await this.supabase
      .from('provinces')
      .select('*')
      .order('name', { ascending: true })

    if (error) throw error
    return data || []
  }

  async getEngineersByProvince(provinceId: string) {
    const { data, error } = await this.supabase
      .from('user_profiles')
      .select(`
        id,
        first_name,
        surname,
        email,
        role,
        custom_role,
        technologies,
        linkedin_url,
        github_url,
        telegram_url,
        provinces!inner(name)
      `)
      .eq('province_id', provinceId)
      .eq('profile_completed', true)

    if (error) throw error
    
    return (data || []).map((user: any) => ({
      ...user,
      province_name: user.provinces?.name || ''
    }))
  }

  async sendFriendRequest(senderId: string, receiverId: string, message?: string) {
    const { data, error } = await this.supabase
      .from('friend_requests')
      .insert({
        sender_id: senderId,
        receiver_id: receiverId,
        message: message || '',
        status: 'pending'
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  async getSentFriendRequests(userId: string) {
    const { data, error } = await this.supabase
      .from('friend_requests')
      .select('id, receiver_id, status')
      .eq('sender_id', userId)

    if (error) throw error
    return data || []
  }

  async getReceivedFriendRequests(userId: string) {
    const { data, error } = await this.supabase
      .from('friend_requests')
      .select(`
        id,
        sender_id,
        message,
        status,
        created_at,
        user_profiles!friend_requests_sender_id_fkey(
          first_name,
          surname,
          role,
          custom_role
        )
      `)
      .eq('receiver_id', userId)
      .eq('status', 'pending')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  async respondToFriendRequest(requestId: string, status: 'accepted' | 'rejected') {
    const { error } = await this.supabase
      .from('friend_requests')
      .update({ status })
      .eq('id', requestId)

    if (error) throw error
  }
}

// Client-side utilities for server components
export async function getServerUser() {
  // This will be handled by client-side auth only for now
  return null
}

export async function getServerUserProfile(userId: string): Promise<UserProfile | null> {
  // This will be handled by client-side auth only for now
  return null
}

// Validation utilities
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePassword(password: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = []
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  
  if (!/(?=.*\d)/.test(password)) {
    errors.push('Password must contain at least one number')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export function validateUrl(url: string, platform: string): boolean {
  try {
    const urlObj = new URL(url)
    
    switch (platform.toLowerCase()) {
      case 'linkedin':
        return urlObj.hostname.includes('linkedin.com')
      case 'github':
        return urlObj.hostname.includes('github.com')
      case 'telegram':
        return urlObj.hostname.includes('t.me') || urlObj.hostname.includes('telegram.me')
      case 'instagram':
        return urlObj.hostname.includes('instagram.com')
      case 'youtube':
        return urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be')
      default:
        return true
    }
  } catch {
    return false
  }
}
