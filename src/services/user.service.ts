import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';
import { getSupabaseClient } from '@/lib/supabase';

export class UserService {
  static async getMe(supabase: SupabaseClient<Database>) {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) throw new Error("Usuário não encontrado");

    return {
      id: user.id,
      email: user.email,
      createdAt: user.created_at,
    };
  }

  static async create(email: string, password: string) {
    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw new Error(error.message);
    
    return {
      id: data.user?.id,
      email: data.user?.email,
      session: data.session
    };
  }
}