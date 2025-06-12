import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import ProductList from '@/components/ProductList';
import ProductForm from '@/components/ProductForm';
import Loading from '@/components/Loading';

export default async function ProdutosPage() {
  const session = await getServerSession();
  
  if (!session) {
    redirect('/login');
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Estoque de Supermercado</h1>
      
      <div className="mb-6">
        <ProductForm />
      </div>
      
      <Suspense fallback={<Loading />}>
        <ProductList />
      </Suspense>
    </div>
  );
}
