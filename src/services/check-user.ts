import { createClient } from '@/utils/supabase/server'

export async function checkUser() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return false
  }

  return user
}
