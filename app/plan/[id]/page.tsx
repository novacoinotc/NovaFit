import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import { NutritionPlan } from "@/types";
import PlanTabs from "@/components/plan/PlanTabs";
import PlanHeader from "@/components/plan/PlanHeader";
import ExportPlanButton from "@/components/plan/ExportPlanButton";
import SharePlanButton from "@/components/plan/SharePlanButton";
import DeletePlanButton from "@/components/plan/DeletePlanButton";
import RegeneratePlanButton from "@/components/plan/RegeneratePlanButton";
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
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <h1 className="text-3xl font-bold text-gray-900">
              Tu Plan Personalizado
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              <ExportPlanButton />
              <SharePlanButton planId={plan.id} />
              <RegeneratePlanButton planId={plan.id} />
              <DeletePlanButton planId={plan.id} />
            </div>
          </div>
          <p className="text-gray-500 mt-1 print:hidden">
            Plan completo de nutricion y ejercicio generado por IA
          </p>
        </div>

        {/* Plan metadata header */}
        <PlanHeader plan={planContent} planType={plan.type} createdAt={createdAt} />

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <PlanTabs plan={planContent} />
        </div>

        <div className="mt-8 text-center print:hidden">
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
