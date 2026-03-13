import Link from "next/link";

export default function PlanNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 pt-16">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Plan no encontrado
        </h1>
        <p className="text-gray-500 mb-6">
          El plan que buscas no existe o no tienes acceso a el. Puede que haya
          sido eliminado o que el enlace sea incorrecto.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl shadow-sm hover:shadow-md transition active:scale-[0.98]"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
          Volver a mis planes
        </Link>
      </div>
    </div>
  );
}
