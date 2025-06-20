// Temporary compatibility layer - will be removed after migration
// Use the new API client instead: import { apiClient } from "@/lib/api";

export const supabase = {
  // Mock implementation for compatibility during migration
  auth: {
    signUp: () => Promise.resolve({ data: null, error: new Error('Use server-side auth') }),
    signIn: () => Promise.resolve({ data: null, error: new Error('Use server-side auth') }),
    signOut: () => Promise.resolve({ error: null }),
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
  },
  from: () => ({
    select: () => Promise.resolve({ data: [], error: null }),
    insert: () => Promise.resolve({ data: null, error: null }),
    update: () => Promise.resolve({ data: null, error: null }),
    delete: () => Promise.resolve({ data: null, error: null })
  })
};