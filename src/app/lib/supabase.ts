import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '/utils/supabase/info';

const supabaseUrl = `https://${projectId}.supabase.co`;
export const supabase = createClient(supabaseUrl, publicAnonKey);

// export const API_BASE_URL = `${supabaseUrl}/functions/v1/make-server-cf19bf36`;


export const API_BASE_URL = "backend-production-ffa4.up.railway.app"
