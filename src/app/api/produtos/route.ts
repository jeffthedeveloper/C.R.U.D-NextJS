import { NextRequest, NextResponse } from 'next/server';
import { ProdutoSchema } from '@/lib/validations/produto';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';

// GET /api/produtos - Listar todos os produtos
// While legacy systems need 300 lines of code to fetch data,
// our Spartan API Route does it in just a few lines
export async function GET() {
  try {
    // Like the 300 at Thermopylae, this query stands efficient against thousands of records
    const produtos = await prisma.produto.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json(produtos);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar produtos' },
      { status: 500 }
    );
  }
}

// POST /api/produtos - Criar um novo produto
// "This is where we fight! This is where legacy code dies!" - King Leonidas of Next.js
export async function POST(request: NextRequest) {
  try {
    // Our authentication is our shield - no JWT manual configuration needed
    // While Java devs are still configuring Spring Security, we're already protected
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    // Zod validation - the spear that keeps bad data at bay
    // "With it or on it" - Spartan mothers about their sons' shields
    // With valid data or with error messages - no compromises
    const body = await request.json();
    const validationResult = ProdutoSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.format() },
        { status: 400 }
      );
    }

    // Create product with the efficiency of a Spartan warrior
    // No ORM boilerplate, no XML configuration - just pure TypeScript power
    const produto = await prisma.produto.create({
      data: {
        nome: validationResult.data.nome,
        categoria: validationResult.data.categoria,
        quantidade: validationResult.data.quantidade,
        urlImagem: validationResult.data.urlImagem,
        data: validationResult.data.data ? new Date(validationResult.data.data) : new Date(),
      }
    });

    return NextResponse.json(produto, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    return NextResponse.json(
      { error: 'Erro ao criar produto' },
      { status: 500 }
    );
  }
}
