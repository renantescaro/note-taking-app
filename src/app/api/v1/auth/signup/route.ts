import { NextResponse } from "next/server";
import { UserService } from "@/services/user.service";
import { z } from "zod";

const signupSchema = z.object({
  email: z.email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = signupSchema.parse(body);

    const newUser = await UserService.create(email, password);

    return NextResponse.json({
      message: "Usuário criado com sucesso",
      user: newUser,
    }, { status: 201 });
    
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { errors: error.format() },
        { status: 400 });
    }
    return NextResponse.json(
        { error: error.message },
        { status: 400 }
    );
  }
}
