import { NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase';
import { NoteService } from '@/services/note.service';
import { createNoteSchema } from '@/schemas/note.schema';

export async function GET(request: Request) {
  try {
    const token = request.headers.get('Authorization')!.split(' ')[1];
    const supabase = getSupabaseClient(token);

    const notes = await NoteService.listAll(supabase);
    return NextResponse.json(notes);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const token = request.headers.get('Authorization')!.split(' ')[1];
    const supabase = getSupabaseClient(token);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const body = await request.json();
    const validated = createNoteSchema.parse(body);

    const note = await NoteService.create(
      supabase,
      validated.title,
      validated.content,
      user!.id,
    );

    return NextResponse.json(note, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
