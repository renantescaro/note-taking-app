import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

export class NoteService {
  static async listAll(supabase: SupabaseClient<Database>) {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async create(
    supabase: SupabaseClient<Database>,
    title: string,
    content: string,
    userId: string,
  ) {
    const { data, error } = await supabase
      .from('notes')
      .insert([{ title, content, user_id: userId }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async update(
    supabase: SupabaseClient<Database>,
    id: string,
    updates: { title?: string; content?: string },
  ) {
    const { data, error } = await supabase
      .from('notes')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async delete(supabase: SupabaseClient<Database>, id: string) {
    const { error } = await supabase.from('notes').delete().eq('id', id);

    if (error) throw error;
    return true;
  }
}
