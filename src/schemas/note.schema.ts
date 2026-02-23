import { z } from 'zod';

export const createNoteSchema = z.object({
  title: z
    .string()
    .min(3, 'O título deve ter pelo menos 3 caracteres')
    .max(100, 'Título muito longo'),
  content: z.string().min(1, 'O conteúdo não pode estar vazio'),
});

export const updateNoteSchema = createNoteSchema.partial();

export type CreateNoteInput = z.infer<typeof createNoteSchema>;
