import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.EXPO_PUBLIC_REACT_APP_SUPABASE_URL
const supabaseKey = process.env.EXPO_PUBLIC_REACT_APP_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;