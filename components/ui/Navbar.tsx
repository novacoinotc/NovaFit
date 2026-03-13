"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hide navbar on questionnaire page (has its own header)
  if (pathname.startsWith("/questionnaire")) {
    return null;
  }

  const isAuthenticated = status === "authenticated";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              Nova<span className="text-emerald-600">FIT</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-500">
                  {session?.user?.name || session?.user?.email}
                </span>
                <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-gray-900 font-medium text-sm"
                >
                  Mis planes
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-gray-500 hover:text-gray-700 font-medium text-sm"
                >
                  Cerrar sesion
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-gray-900 font-medium text-sm"
                >
                  Iniciar sesion
                </Link>
                <Link
                  href="/register"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm py-2 px-4 rounded-lg shadow-sm hover:shadow-md active:scale-[0.98]"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-4 space-y-3">
            {isAuthenticated ? (
              <>
                <p className="text-sm text-gray-500 px-2">
                  {session?.user?.name || session?.user?.email}
                </p>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-2 py-2 text-gray-700 hover:text-emerald-600 font-medium text-sm rounded-lg hover:bg-gray-50"
                >
                  Mis planes
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="block w-full text-left px-2 py-2 text-gray-500 hover:text-gray-700 font-medium text-sm rounded-lg hover:bg-gray-50"
                >
                  Cerrar sesion
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-2 py-2 text-gray-700 hover:text-emerald-600 font-medium text-sm rounded-lg hover:bg-gray-50"
                >
                  Iniciar sesion
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm py-2 px-4 rounded-lg text-center"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
