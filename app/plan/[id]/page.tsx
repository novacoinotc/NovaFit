import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import { NutritionPlan } from "@/types";
import PlanTabs from "@/components/plan/PlanTabs";
import Link from "next/link";

interface PlanPageProps {
  params: { id: string };
}

export default async function PlanViewPage({ params }: PlanPageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const userId = (session.user as { id: string }).id;

  const plan = await prisma.plan.findUnique({
    where: { id: params.id },
  });

  if (!plan || plan.userId !== userId) {
    notFound();
  }

  const planContent = plan.content as unknown as NutritionPlan;
  const createdAt = plan.createdAt.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="text-lg font-bold text-gray-900">
              Nova<span className="text-emerald-600">FIT</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Creado: {createdAt}</span>
            <Link
              href="/dashboard"
              className="text-sm text-gray-600 hover:text-gray-900 font-medium"
            >
              Mis planes
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Tu Plan Personalizado
          </h1>
          <p className="text-gray-500 mt-1">
            Plan completo de nutricion y ejercicio generado por IA
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <PlanTabs plan={planContent} />
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/questionnaire"
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Generar nuevo plan
          </Link>
        </div>
      </main>
    </div>
  );
}
