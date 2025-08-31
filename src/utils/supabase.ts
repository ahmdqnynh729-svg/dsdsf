import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create Supabase client with error handling
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false
      },
      global: {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    })
  : null;

// Helper function to check if Supabase is properly configured
export const isSupabaseConfigured = (): boolean => {
  return !!(supabaseUrl && supabaseAnonKey && supabase);
};

// Helper function to handle Supabase errors
export const handleSupabaseError = (error: any): string => {
  if (error?.message?.includes('Failed to fetch')) {
    return 'مشكلة في الاتصال بالخادم. تحقق من اتصال الإنترنت أو حاول مرة أخرى.';
  }
  if (error?.message?.includes('CORS')) {
    return 'مشكلة في إعدادات الخادم. يرجى التواصل مع الإدارة.';
  }
  return error?.message || 'حدث خطأ غير متوقع';
};