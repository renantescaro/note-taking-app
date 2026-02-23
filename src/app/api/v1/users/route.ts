import { NextResponse } from 'next/server';
import { UserService } from '@/services/user.service';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.email) {
      return NextResponse.json(
        { error: 'Email é obrigatório' },
        { status: 400 },
      );
    }

    const newUser = await UserService.create(body.email, body.password);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}
