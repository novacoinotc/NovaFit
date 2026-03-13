"use client";

import { QuestionnaireData } from "@/types";

interface StepProps {
  data: QuestionnaireData;
  updateData: (updates: Partial<QuestionnaireData>) => void;
}

const GOALS = [
  {
    value: "lose_fat" as const,
    label: "Perder grasa",
    icon: "🔥",
    description: "Reducir grasa corporal manteniendo masa muscular",
  },
  {
    value: "gain_muscle" as const,
    label: "Ganar músculo",
    icon: "💪",
    description: "Aumentar masa muscular y fuerza",
  },
  {
    value: "recomposition" as const,
    label: "Recomposición corporal",
    icon: "⚖️",
    description: "Perder grasa y ganar músculo al mismo tiempo",
  },
  {
    value: "improve_health" as const,
    label: "Mejorar salud",
    icon: "❤️",
    description: "Mejorar marcadores de salud y bienestar general",
  },
  {
    value: "athletic_performance" as const,
    label: "Rendimiento deportivo",
    icon: "🏆",
    description: "Optimizar nutrición para mejor desempeño atlético",
  },
  {
    value: "maintain_weight" as const,
    label: "Mantener peso",
    icon: "✅",
    description: "Mantener mi peso actual con mejor nutrición",
  },
];

const TIMELINES = [
  "1-2 meses",
  "3-4 meses",
  "5-6 meses",
  "6-12 meses",
  "Más de 1 año",
  "Sin prisa específica",
];

export default function StepGoal({ data, updateData }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
          Objetivo Principal
        </h2>
        <p className="text-gray-500 mt-1 text-sm sm:text-base">
          Elige el objetivo que más se acerque a lo que quieres lograr.
        </p>
      </div>

      {/* Objetivo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {GOALS.map((goal) => (
          <button
            key={goal.value}
            type="button"
            onClick={() => updateData({ mainGoal: goal.value })}
            className={`rounded-xl border p-3 sm:p-4 text-left transition min-h-[44px] ${
              data.mainGoal === goal.value
                ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/20"
                : "border-gray-300 bg-white hover:border-gray-400"
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{goal.icon}</span>
              <div>
                <span
                  className={`block font-semibold text-sm ${
                    data.mainGoal === goal.value
                      ? "text-emerald-700"
                      : "text-gray-800"
                  }`}
                >
                  {goal.label}
                </span>
                <span className="block text-xs text-gray-500 mt-0.5">
                  {goal.description}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Plazo deseado
        </label>
        <div className="flex flex-wrap gap-2">
          {TIMELINES.map((timeline) => (
            <button
              key={timeline}
              type="button"
              onClick={() => updateData({ desiredTimeline: timeline })}
              className={`px-4 py-2.5 sm:py-2 rounded-full text-sm font-medium border transition min-h-[44px] sm:min-h-0 ${
                data.desiredTimeline === timeline
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                  : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
              }`}
            >
              {timeline}
            </button>
          ))}
        </div>
      </div>

      {/* Evento específico */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Evento o fecha específica{" "}
          <span className="text-gray-400 font-normal">— opcional</span>
        </label>
        <input
          type="text"
          value={data.specificEvent}
          onChange={(e) => updateData({ specificEvent: e.target.value })}
          placeholder="Ej: Boda en septiembre, vacaciones en la playa..."
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
        />
      </div>
    </div>
  );
}
