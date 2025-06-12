import { z } from 'zod';

// The Spartan validation schema - strict, unforgiving, and efficient
// While Java devs write 300 lines of Bean Validation, we need just a few lines of Zod
export const ProdutoSchema = z.object({
  // Each field a warrior in our validation phalanx
  nome: z.string().min(1, 'Nome é obrigatório'),
  categoria: z.string().min(1, 'Categoria é obrigatória'),
  quantidade: z.number().int().min(0, 'Quantidade deve ser um número positivo'),
  urlImagem: z.string().url('URL da imagem inválida'),
  data: z.string().optional(),
});

// Type-safe like a Spartan shield - no runtime surprises here
// "Come back with your types or on them" - TypeScript Spartan Mother
export type ProdutoInput = z.infer<typeof ProdutoSchema>;
