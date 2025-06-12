import { Suspense } from 'react';
import prisma from '@/lib/prisma';
import ProductCard from './ProductCard';
import Loading from './Loading';

// This function fetches products directly from the database
// Like the 300 Spartans who didn't need reinforcements, our Server Component doesn't need API calls
async function getProducts() {
  // In a Server Component, we can access the database directly
  // While legacy systems need 300 lines of DAO/Repository patterns, we do it in 3 lines
  const produtos = await prisma.produto.findMany({
    orderBy: { createdAt: 'desc' }
  });
  
  return produtos;
}

// ProductList: The Spartan phalanx of our UI architecture
// Server Component that renders efficiently without client-side JavaScript bloat
export default async function ProductList() {
  // Fetch products with the efficiency of Spartan scouts
  const produtos = await getProducts();
  
  if (produtos.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Nenhum produto cadastrado.</p>
      </div>
    );
  }
  
  // Our product grid - as organized as the Spartan battle formation
  // Each ProductCard a warrior in our UI phalanx
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {produtos.map((produto) => (
        <Suspense key={produto.id} fallback={<Loading />}>
          <ProductCard produto={produto} />
        </Suspense>
      ))}
    </div>
  );
}
