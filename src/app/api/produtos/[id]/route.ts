import { NextRequest, NextResponse } from 'next/server';
import { ProdutoSchema } from '@/lib/validations/produto';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';

// GET /api/produtos/[id] - Buscar um produto específico
// Like a Spartan scout, this endpoint retrieves a single target with precision
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID inválido' },
        { status: 400 }
      );
    }

    // Find the product with the accuracy of a Spartan spear throw
    const produto = await prisma.produto.findUnique({
      where: { id }
    });

    if (!produto) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(produto);
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar produto' },
      { status: 500 }
    );
  }
}

// PUT /api/produtos/[id] - Atualizar um produto
// "Adapt or perish" - The Spartan code of software evolution
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Authentication - our first line of defense
    // While legacy systems need 300 lines of security config, we need just one call
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID inválido' },
        { status: 400 }
      );
    }

    // Verify product exists - as thorough as Spartan reconnaissance
    const existingProduto = await prisma.produto.findUnique({
      where: { id }
    });

    if (!existingProduto) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      );
    }

    // Validate input - our shield against bad data
    // "With it or on it" - Spartan mothers about their sons' shields
    const body = await request.json();
    const validationResult = ProdutoSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.format() },
        { status: 400 }
      );
    }

    // Update product - as decisive as a Spartan charge
    const produto = await prisma.produto.update({
      where: { id },
      data: {
        nome: validationResult.data.nome,
        categoria: validationResult.data.categoria,
        quantidade: validationResult.data.quantidade,
        urlImagem: validationResult.data.urlImagem,
        data: validationResult.data.data ? new Date(validationResult.data.data) : existingProduto.data,
      }
    });

    return NextResponse.json(produto);
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar produto' },
      { status: 500 }
    );
  }
}

// DELETE /api/produtos/[id] - Excluir um produto
// "Tonight, we delete in production!" - King Leonidas of CRUD
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Authentication - as unyielding as the Spartan line at Thermopylae
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID inválido' },
        { status: 400 }
      );
    }

    // Verify product exists - no Spartan strikes blindly
    const existingProduto = await prisma.produto.findUnique({
      where: { id }
    });

    if (!existingProduto) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      );
    }

    // Delete product - as final as a Spartan's judgment
    await prisma.produto.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
    return NextResponse.json(
      { error: 'Erro ao excluir produto' },
      { status: 500 }
    );
  }
}
