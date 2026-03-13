import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">N</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">
            Nova<span className="text-emerald-600">FIT</span>
          </span>
        </div>

        {/* 404 */}
        <div className="mb-6">
          <p className="text-8xl font-black text-emerald-600 mb-2">404</p>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Pagina no encontrada
          </h1>
          <p className="text-gray-500 leading-relaxed">
            Lo sentimos, la pagina que buscas no existe o fue movida.
            Verifica la URL o regresa al inicio.
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl shadow-sm hover:shadow-md transition active:scale-[0.98]"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            Volver al inicio
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 border border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-semibold py-3 px-6 rounded-xl transition"
          >
            Mis planes
          </Link>
        </div>
      </div>
    </div>
  );
}
