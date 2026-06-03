"use client";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchProducts = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Error al obtener los productos");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este producto?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id));
        alert("Producto eliminado con éxito");
      } else {
        alert("No se pudo eliminar el producto");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
        <p className="text-gray-400 font-medium text-center max-w-sm">
          Cargando catálogo desde Render...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto my-10 bg-red-950/30 border border-red-800 text-red-400 p-4 rounded-xl text-center">
        <p className="font-semibold">⚠️ Error de conexión</p>
        <p className="text-sm mt-1">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Título adaptivo con mejor contraste para temas oscuros/claros */}
      <div className="border-b border-gray-700/50 pb-4 mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Catálogo de Productos
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Gestión de inventario en tiempo real conectado a MySQL.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="bg-indigo-950/20 border border-indigo-900 text-indigo-300 p-8 rounded-xl text-center">
          <p className="font-medium">
            No hay productos disponibles en el inventario.
          </p>
          <p className="text-sm text-indigo-400/70 mt-1">
            ¡Crea el primero usando el botón superior!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-zinc-900 rounded-xl shadow-lg overflow-hidden border border-zinc-800 flex flex-col justify-between hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Contenedor de Imagen */}
              <div className="relative aspect-video w-full overflow-hidden bg-zinc-800 border-b border-zinc-800">
                <img
                  src={
                    product.image_url ||
                    "https://via.placeholder.com/400x300?text=No+Image"
                  }
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Cuerpo de la Tarjeta */}
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <h2 className="font-bold text-lg text-zinc-100 mb-1 tracking-tight">
                    {product.name}
                  </h2>
                  <p className="text-zinc-400 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
                    {product.description || "Sin descripción provista."}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-zinc-800/60">
                  <span className="text-xl font-black text-indigo-400">
                    ${Number(product.price).toFixed(2)}
                  </span>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-md font-bold tracking-wide ${
                      product.stock > 0
                        ? "bg-green-500/10 text-green-400 border border-green-500/20"
                        : "bg-red-500/10 text-red-400 border border-red-500/20"
                    }`}
                  >
                    Stock: {product.stock}
                  </span>
                </div>
              </div>

              {/* Botones de Acción: Editar y Eliminar */}
              <div className="px-5 pb-5 pt-0 flex gap-3">
                {/* Botón Editar (Nuevo) */}
                <a
                  href={`/editar/${product.id}`}
                  className="w-1/2 bg-zinc-850 hover:bg-indigo-600 text-center text-zinc-300 hover:text-white text-sm py-2.5 rounded-lg font-medium transition-all duration-200 border border-zinc-700/60 hover:border-indigo-600 shadow-sm"
                >
                  Editar
                </a>

                {/* Botón Eliminar */}
                <button
                  onClick={() => handleDelete(product.id)}
                  className="cursor-pointer w-1/2 bg-zinc-850 hover:bg-red-600 text-zinc-300 hover:text-white text-sm py-2.5 rounded-lg font-medium transition-all duration-200 border border-zinc-700/60 hover:border-red-600 shadow-sm"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
