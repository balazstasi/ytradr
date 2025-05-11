import { createClient } from '@supabase/supabase-js'

const databaseUrl: string = import.meta.env.VITE_SUPABASE_PROJECT_URL!
const databaseKey: string = import.meta.env.VITE_SUPABASE_API_KEY!
const database = createClient(databaseUrl, databaseKey)

export default database
