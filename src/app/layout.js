import './globals.css';

export const metadata = {
  title: 'Mi Ecommerce - Examen',
  description: 'Desarrollado con Next.js y Express',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        <header className="bg-indigo-600 text-white shadow-md">
          {/* Se cambió 'container mx-auto px-4' para usar una alineación max-w idéntica a la del catálogo */}
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
            <nav className="py-4 flex justify-between items-center">
              <a href="/" className="text-xl font-bold tracking-wide hover:opacity-90 transition">
                🚀 MiTienda
              </a>
              <div className="space-x-4 flex items-center">
                <a href="/" className="hover:underline text-sm font-medium">Inicio</a>
                <a href="/nuevo" className="bg-white text-indigo-600 px-4 py-2 rounded-md font-semibold hover:bg-gray-100 transition shadow-sm text-sm">
                  + Agregar Producto
                </a>
              </div>
            </nav>
          </div>
        </header>

        {/* Contenedor principal con la misma estructura de rejilla y márgenes simétricos */}
        <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-grow">
          {children}
        </main>

        <footer className="bg-gray-800 text-gray-400 text-center py-6 text-sm mt-8 border-t border-zinc-800">
          Examen de Desarrollo Web - {new Date().getFullYear()}
        </footer>
      </body>
    </html>
  );
}