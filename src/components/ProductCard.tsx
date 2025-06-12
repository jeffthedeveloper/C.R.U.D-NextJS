'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';
import ProductForm from './ProductForm';

type Produto = {
  id: number;
  nome: string;
  categoria: string;
  quantidade: number;
  urlImagem: string;
  data: Date;
};

type ProductCardProps = {
  produto: Produto;
};

// ProductCard: The elite hoplite of our UI components
// While legacy systems need 300 lines of XML configuration, our component is lean and efficient
export default function ProductCard({ produto }: ProductCardProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Delete handler - as merciless as a Spartan warrior
  // "Tonight, we delete in production!" - King Leonidas of CRUD
  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) {
      return;
    }
    
    setIsDeleting(true);
    
    try {
      // Our DELETE request - as precise as a Spartan spear throw
      const response = await fetch(`/api/produtos/${produto.id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Erro ao excluir produto');
      }
      
      // Refresh the UI with the efficiency of the Spartan battle formation
      router.refresh();
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      alert('Erro ao excluir produto. Tente novamente.');
    } finally {
      setIsDeleting(false);
    }
  };
  
  // Conditional rendering - the tactical flexibility of the Spartan army
  // Adapting to changing battlefield conditions like a true warrior
  if (isEditing) {
    return (
      <ProductForm 
        produto={produto} 
        onSuccess={() => setIsEditing(false)} 
      />
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={produto.urlImagem}
          alt={produto.nome}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-1">{produto.nome}</h3>
        <p className="text-gray-500 text-sm mb-2">
          Data: {format(new Date(produto.data), 'dd/MM/yyyy')}
        </p>
        
        <div className="mb-4">
          <p><span className="font-medium">Categoria:</span> {produto.categoria}</p>
          <p><span className="font-medium">Quantidade:</span> {produto.quantidade}</p>
        </div>
        
        {/* Our action buttons - the weapons of our Spartan UI */}
        <div className="flex space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
          >
            Editar
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md disabled:bg-red-300"
          >
            {isDeleting ? 'Excluindo...' : 'Excluir'}
          </button>
        </div>
      </div>
    </div>
  );
}
