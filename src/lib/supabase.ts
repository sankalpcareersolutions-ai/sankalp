import { createClient } from '@supabase/supabase-js';

const envUrl = import.meta.env.VITE_SUPABASE_URL;
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseUrl = envUrl && envUrl.startsWith('http') 
  ? envUrl 
  : 'https://vazdxebogaeubgfzrkac.supabase.co';

const supabaseKey = envKey && envKey.length > 20 
  ? envKey 
  : 'sb_publishable_XX6AcnYGre79tvQ70mY4GA_jRtks9nh';

export const supabase = createClient(supabaseUrl, supabaseKey);
