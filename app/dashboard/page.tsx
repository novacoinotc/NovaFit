"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface PlanSummary {
  id: string;
  type: string;
  summary: string | null;
  caloriesTarget: number | null;
  proteinTarget: number | null;
  carbsTarget: number | null;
  fatsTarget: number | null;
  createdAt: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [plans, setPlans] = useState<PlanSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/plans")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setPlans(data);
          }
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [status]);

  if (status === "loading" || (status === "authenticated" && loading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Cargando...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="text-lg font-bold text-gray-900">
              Nova<span className="text-emerald-600">FIT</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              {session?.user?.name || session?.user?.email}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-sm text-gray-500 hover:text-gray-700 font-medium"
            >
              Cerrar sesion
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mis Planes</h1>
            <p className="text-gray-500 mt-1">
              Tu historial de planes de nutricion y ejercicio
            </p>
          </div>
          <Link
            href="/questionnaire"
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl shadow-sm hover:shadow-md transition active:scale-[0.98]"
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Nuevo plan
          </Link>
        </div>

        {plans.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-emerald-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Aun no tienes planes
            </h2>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Completa el cuestionario y nuestra IA generara tu primer plan
              personalizado de nutricion y ejercicio.
            </p>
            <Link
              href="/questionnaire"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl shadow-sm hover:shadow-md transition active:scale-[0.98]"
            >
              Crear mi primer plan
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plans.map((plan) => {
              const date = new Date(plan.createdAt).toLocaleDateString(
                "es-ES",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              );
              return (
                <Link
                  key={plan.id}
                  href={`/plan/${plan.id}`}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 p-6 block"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-medium px-2 py-1 rounded-full">
                        Plan Completo
                      </span>
                      <p className="text-sm text-gray-400 mt-2">{date}</p>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </div>

                  {plan.summary && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {plan.summary}
                    </p>
                  )}

                  {plan.caloriesTarget && (
                    <div className="grid grid-cols-4 gap-2">
                      <div className="text-center bg-gray-50 rounded-lg py-2">
                        <p className="text-sm font-bold text-gray-900">
                          {plan.caloriesTarget}
                        </p>
                        <p className="text-xs text-gray-500">kcal</p>
                      </div>
                      <div className="text-center bg-gray-50 rounded-lg py-2">
                        <p className="text-sm font-bold text-gray-900">
                          {plan.proteinTarget}g
                        </p>
                        <p className="text-xs text-gray-500">Proteina</p>
                      </div>
                      <div className="text-center bg-gray-50 rounded-lg py-2">
                        <p className="text-sm font-bold text-gray-900">
                          {plan.carbsTarget}g
                        </p>
                        <p className="text-xs text-gray-500">Carbs</p>
                      </div>
                      <div className="text-center bg-gray-50 rounded-lg py-2">
                        <p className="text-sm font-bold text-gray-900">
                          {plan.fatsTarget}g
                        </p>
                        <p className="text-xs text-gray-500">Grasas</p>
                      </div>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
