"use client";

import { QuestionnaireData } from "@/types";

interface StepProps {
  data: QuestionnaireData;
  updateData: (updates: Partial<QuestionnaireData>) => void;
}

export default function StepExtras({ data, updateData }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
          Detalles Adicionales
        </h2>
        <p className="text-gray-500 mt-1 text-sm sm:text-base">
          Últimos detalles para afinar tu plan personalizado.
        </p>
      </div>

      {/* Dietas previas */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Dietas o planes que has seguido antes
        </label>
        <textarea
          value={data.previousDiets}
          onChange={(e) => updateData({ previousDiets: e.target.value })}
          placeholder="Ej: Keto por 3 meses, ayuno intermitente 16:8, dieta del nutriólogo..."
          rows={3}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition resize-none"
        />
      </div>

      {/* Nivel de rigidez */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          ¿Qué tan estricto quieres que sea tu plan?
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              value: "flexible" as const,
              label: "Flexible",
              desc: "Guías generales, libertad para ajustar",
              icon: "🌊",
            },
            {
              value: "moderate" as const,
              label: "Moderado",
              desc: "Estructura clara con algo de flexibilidad",
              icon: "⚖️",
            },
            {
              value: "strict" as const,
              label: "Estricto",
              desc: "Plan detallado, cantidades exactas",
              icon: "📏",
            },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => updateData({ planStrictness: opt.value })}
              className={`rounded-xl border p-3 sm:p-4 text-center transition min-h-[44px] ${
                data.planStrictness === opt.value
                  ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/20"
                  : "border-gray-300 bg-white hover:border-gray-400"
              }`}
            >
              <span className="text-2xl block mb-1">{opt.icon}</span>
              <span
                className={`block text-sm font-semibold ${
                  data.planStrictness === opt.value
                    ? "text-emerald-700"
                    : "text-gray-800"
                }`}
              >
                {opt.label}
              </span>
              <span className="block text-xs text-gray-500 mt-1">
                {opt.desc}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Variedad */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          ¿Prefieres variedad o repetir comidas?
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              value: "variety" as const,
              label: "Mucha variedad",
              desc: "Diferentes comidas cada día",
              icon: "🎨",
            },
            {
              value: "repeat" as const,
              label: "Repetir está bien",
              desc: "Pocas comidas que se repiten",
              icon: "🔄",
            },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => updateData({ varietyPreference: opt.value })}
              className={`rounded-xl border p-3 sm:p-4 text-center transition min-h-[44px] ${
                data.varietyPreference === opt.value
                  ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/20"
                  : "border-gray-300 bg-white hover:border-gray-400"
              }`}
            >
              <span className="text-2xl block mb-1">{opt.icon}</span>
              <span
                className={`block text-sm font-semibold ${
                  data.varietyPreference === opt.value
                    ? "text-emerald-700"
                    : "text-gray-800"
                }`}
              >
                {opt.label}
              </span>
              <span className="block text-xs text-gray-500 mt-1">
                {opt.desc}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Meal prep */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition">
          <button
            type="button"
            onClick={() =>
              updateData({ needsMealPrep: !data.needsMealPrep })
            }
            className={`relative w-12 h-7 rounded-full transition-colors shrink-0 mt-0.5 ${
              data.needsMealPrep ? "bg-emerald-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                data.needsMealPrep ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
          <div>
            <span className="block text-sm font-medium text-gray-700">
              Necesito plan de meal prep
            </span>
            <span className="block text-xs text-gray-500 mt-0.5">
              Preparar comidas con anticipación para la semana
            </span>
          </div>
        </label>
      </div>

      {/* Notas adicionales */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notas adicionales{" "}
          <span className="text-gray-400 font-normal">— opcional</span>
        </label>
        <textarea
          value={data.additionalNotes}
          onChange={(e) => updateData({ additionalNotes: e.target.value })}
          placeholder="¿Algo más que debamos saber? Preferencias especiales, restricciones religiosas, metas específicas..."
          rows={4}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition resize-none"
        />
      </div>
    </div>
  );
}
