import { Database } from './supabase';

export * from './user';
export * from './note';
// export * from './api';


export type NoteRow = Database['public']['Tables']['notes']['Row'];
export type NoteInsert = Database['public']['Tables']['notes']['Insert'];
