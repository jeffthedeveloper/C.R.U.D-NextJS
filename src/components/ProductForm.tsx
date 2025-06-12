'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

type ProdutoFormProps = {
  produto?: {
    id: number;
    nome: string;
    categoria: string;
    quantidade: number;
    urlImagem: string;
  };
  onSuccess?: () => void;
};

// ProductForm: The battle formation of our CRUD operations
// While legacy forms need 300 lines of XML, our React component is lean and deadly
export default function ProductForm({ produto, onSuccess }: ProdutoFormProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nome: produto?.nome || '',
    categoria: produto?.categoria || '',
    quantidade: produto?.quantidade || 0,
    urlImagem: produto?.urlImagem || '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form validation - as strict as Spartan training
  // "Only the perfect forms return from battle" - Spartan Form Master
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }
    
    if (!formData.categoria.trim()) {
      newErrors.categoria = 'Categoria é obrigatória';
    }
    
    if (formData.quantidade < 0) {
      newErrors.quantidade = 'Quantidade deve ser um número positivo';
    }
    
    if (!formData.urlImagem.trim()) {
      newErrors.urlImagem = 'URL da imagem é obrigatória';
    } else if (!formData.urlImagem.match(/^https?:\/\/.+/)) {
      newErrors.urlImagem = 'URL da imagem inválida';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle change - as responsive as a Spartan phalanx adjusting to terrain
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseInt(value) : value,
    });
  };

  // Form submission - the decisive battle charge of our application
  // "With these forms or upon them!" - Spartan Developer Creed
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Our API call - as coordinated as the 300 at Thermopylae
      const url = produto 
        ? `/api/produtos/${produto.id}` 
        : '/api/produtos';
      
      const method = produto ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          data: format(new Date(), 'yyyy-MM-dd'),
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao salvar produto');
      }
      
      // Reset form with the efficiency of Spartan discipline
      setFormData({
        nome: '',
        categoria: '',
        quantidade: 0,
        urlImagem: '',
      });
      
      setIsOpen(false);
      
      // Refresh UI - as swift as a Spartan messenger
      router.refresh();
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      setErrors({ form: 'Erro ao salvar produto. Tente novamente.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {!produto && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Adicionar produto
        </button>
      )}
      
      {/* Modal form - as imposing as the Gates of Fire */}
      {(isOpen || produto) && (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${produto ? 'relative bg-transparent' : ''}`}>
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {produto ? 'Editar Produto' : 'Novo Produto'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Nome</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.nome ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome}</p>}
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Categoria</label>
                <input
                  type="text"
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.categoria ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.categoria && <p className="text-red-500 text-sm mt-1">{errors.categoria}</p>}
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Quantidade</label>
                <input
                  type="number"
                  name="quantidade"
                  value={formData.quantidade}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.quantidade ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.quantidade && <p className="text-red-500 text-sm mt-1">{errors.quantidade}</p>}
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">URL da Imagem</label>
                <input
                  type="text"
                  name="urlImagem"
                  value={formData.urlImagem}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.urlImagem ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.urlImagem && <p className="text-red-500 text-sm mt-1">{errors.urlImagem}</p>}
              </div>
              
              {errors.form && (
                <div className="mb-4 p-2 bg-red-100 border border-red-400 rounded-md">
                  <p className="text-red-700 text-sm">{errors.form}</p>
                </div>
              )}
              
              {/* Action buttons - the weapons of our Spartan UI */}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => produto ? onSuccess?.() : setIsOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
