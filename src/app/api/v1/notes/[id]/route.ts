import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";
import { NoteService } from "@/services/note.service";

export async function PUT(
  request: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const token = request.headers.get("Authorization")!.split(" ")[1];
    const supabase = getSupabaseClient(token);
    
    const body = await request.json();
    const updatedNote = await NoteService.update(supabase, id, body);
    
    return NextResponse.json(updatedNote);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const token = request.headers.get("Authorization")!.split(" ")[1];
    const supabase = getSupabaseClient(token);
    
    await NoteService.delete(supabase, id);
    
    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}
