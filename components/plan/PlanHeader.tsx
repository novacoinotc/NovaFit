"use client";

import { NutritionPlan } from "@/types";

interface PlanHeaderProps {
  plan: NutritionPlan;
  planType: string;
  createdAt: string;
}

const GOAL_LABELS: Record<string, string> = {
  complete: "Plan Completo",
  nutrition: "Nutricion",
  exercise: "Ejercicio",
  lose_fat: "Perdida de grasa",
  gain_muscle: "Ganancia muscular",
  recomposition: "Recomposicion",
  improve_health: "Mejorar salud",
  athletic_performance: "Rendimiento deportivo",
  maintain_weight: "Mantener peso",
};

export default function PlanHeader({ plan, planType, createdAt }: PlanHeaderProps) {
  const label = GOAL_LABELS[planType] || "Plan Completo";

  return (
    <div className="mb-8 print:mb-4">
      {/* Badge and date row */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-sm font-semibold px-3 py-1 rounded-full border border-emerald-200">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
          </svg>
          {label}
        </span>
        <span className="text-sm text-gray-400 flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 9v9.75" />
          </svg>
          Creado el {createdAt}
        </span>
      </div>

      {/* Macro cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <MacroCard
          label="Calorias"
          value={plan.macros.calories}
          unit="kcal"
          bgColor="bg-orange-50"
          borderColor="border-orange-200"
          textColor="text-orange-700"
          iconColor="text-orange-500"
          icon={
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
          }
        />
        <MacroCard
          label="Proteina"
          value={plan.macros.protein}
          unit="g"
          bgColor="bg-red-50"
          borderColor="border-red-200"
          textColor="text-red-700"
          iconColor="text-red-500"
          icon={
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          }
        />
        <MacroCard
          label="Carbohidratos"
          value={plan.macros.carbs}
          unit="g"
          bgColor="bg-blue-50"
          borderColor="border-blue-200"
          textColor="text-blue-700"
          iconColor="text-blue-500"
          icon={
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
          }
        />
        <MacroCard
          label="Grasas"
          value={plan.macros.fats}
          unit="g"
          bgColor="bg-yellow-50"
          borderColor="border-yellow-200"
          textColor="text-yellow-700"
          iconColor="text-yellow-500"
          icon={
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
          }
        />
      </div>
    </div>
  );
}

function MacroCard({
  label,
  value,
  unit,
  bgColor,
  borderColor,
  textColor,
  iconColor,
  icon,
}: {
  label: string;
  value: number;
  unit: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  iconColor: string;
  icon: React.ReactNode;
}) {
  return (
    <div className={`rounded-xl border p-4 ${bgColor} ${borderColor}`}>
      <div className="flex items-center gap-2 mb-1">
        <svg className={`w-4 h-4 ${iconColor}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          {icon}
        </svg>
        <span className={`text-xs font-medium ${textColor} opacity-80`}>{label}</span>
      </div>
      <p className={`text-2xl font-bold ${textColor}`}>
        {value.toLocaleString("es-ES")}
        <span className="text-sm font-normal ml-1">{unit}</span>
      </p>
    </div>
  );
}
