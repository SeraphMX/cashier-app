import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

const supabaseUrl = 'https://cycyeloakknxmnssgafq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5Y3llbG9ha2tueG1uc3NnYWZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxNjUzODAsImV4cCI6MjA0OTc0MTM4MH0.u0GwSv9o07eLfPCY4F0yocQJ_IHNWWbdV_jCed-Vl54';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);