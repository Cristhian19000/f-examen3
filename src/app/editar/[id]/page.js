export const dynamic = 'force-dynamic';
export const runtime = 'edge';

'use client';
import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';

export const dynamicParams = true;

export default function EditProductPage({ params: paramsPromise }) {
  const router = useRouter();
  // Desempaquetamos los parámetros dinámicos de la URL usando 'use'
  const params = use(paramsPromise);
  const { id } = params;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // GET: Cargar los datos actuales del producto para rellenar el formulario
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error('No se pudo obtener la información del producto');
        const data = await res.json();
        
        setFormData({
          name: data.name,
          description: data.description || '',
          price: data.price,
          stock: data.stock
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, API_URL]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // PUT: Enviar los datos modificados al Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const productPayload = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock)
    };

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productPayload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Ocurrió un error al actualizar el producto');
      }

      alert('¡Producto actualizado con éxito!');
      router.push('/'); // Regresar al catálogo
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-20 text-zinc-400">Cargando datos del producto...</div>;

  return (
    <div className="max-w-md mx-auto bg-zinc-900 p-6 rounded-xl shadow-lg border border-zinc-800">
      <h1 className="text-2xl font-bold mb-6 text-zinc-100 tracking-tight">
        Editar Producto #{id}
      </h1>
      
      {error && (
        <div className="bg-red-500/10 text-red-400 p-3 rounded-lg mb-4 text-sm font-medium border border-red-500/20">
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-zinc-300 mb-1.5">Nombre del Producto</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-zinc-300 mb-1.5">Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-zinc-300 mb-1.5">Precio ($)</label>
            <input
              type="number"
              name="price"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-700 rounded-lg text-zinc-100"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-zinc-300 mb-1.5">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-700 rounded-lg text-zinc-100"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 mt-4 disabled:bg-zinc-800"
        >
          {submitting ? 'Actualizando...' : 'Guardar Cambios'}
        </button>
      </form>
    </div>
  );
}