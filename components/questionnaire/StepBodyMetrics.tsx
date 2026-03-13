"use client";

import { QuestionnaireData } from "@/types";

interface StepProps {
  data: QuestionnaireData;
  updateData: (updates: Partial<QuestionnaireData>) => void;
}

const BODY_TYPES = [
  {
    value: "ectomorph" as const,
    label: "Ectomorfo",
    description: "Delgado, dificultad para ganar peso",
  },
  {
    value: "mesomorph" as const,
    label: "Mesomorfo",
    description: "Atlético, facilidad para ganar músculo",
  },
  {
    value: "endomorph" as const,
    label: "Endomorfo",
    description: "Robusto, facilidad para ganar peso",
  },
];

export default function StepBodyMetrics({ data, updateData }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Métricas Corporales
        </h2>
        <p className="text-gray-500 mt-1">
          Estas medidas son opcionales pero nos ayudan a ser más precisos.
        </p>
      </div>

      {/* Porcentaje de grasa */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Porcentaje de grasa corporal (%){" "}
          <span className="text-gray-400 font-normal">— opcional</span>
        </label>
        <input
          type="number"
          value={data.bodyFatPercentage ?? ""}
          onChange={(e) =>
            updateData({
              bodyFatPercentage: e.target.value
                ? parseFloat(e.target.value)
                : undefined,
            })
          }
          placeholder="20"
          min={3}
          max={60}
          step={0.1}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
        />
      </div>

      {/* Medidas */}
      <div className="grid grid-cols-2 gap-4">
        {[
          {
            key: "waistMeasurement" as const,
            label: "Cintura (cm)",
            placeholder: "80",
          },
          {
            key: "hipMeasurement" as const,
            label: "Cadera (cm)",
            placeholder: "95",
          },
          {
            key: "armMeasurement" as const,
            label: "Brazo (cm)",
            placeholder: "30",
          },
          {
            key: "chestMeasurement" as const,
            label: "Pecho (cm)",
            placeholder: "95",
          },
        ].map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}{" "}
              <span className="text-gray-400 font-normal">— opcional</span>
            </label>
            <input
              type="number"
              value={data[field.key] ?? ""}
              onChange={(e) =>
                updateData({
                  [field.key]: e.target.value
                    ? parseFloat(e.target.value)
                    : undefined,
                })
              }
              placeholder={field.placeholder}
              min={10}
              max={250}
              step={0.1}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
            />
          </div>
        ))}
      </div>

      {/* Tipo de cuerpo */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tipo de cuerpo
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {BODY_TYPES.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => updateData({ bodyType: type.value })}
              className={`rounded-xl border p-4 text-left transition ${
                data.bodyType === type.value
                  ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/20"
                  : "border-gray-300 bg-white hover:border-gray-400"
              }`}
            >
              <span
                className={`block font-semibold text-sm ${
                  data.bodyType === type.value
                    ? "text-emerald-700"
                    : "text-gray-800"
                }`}
              >
                {type.label}
              </span>
              <span className="block text-xs text-gray-500 mt-1">
                {type.description}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Historial de peso */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Peso hace 1 año (kg){" "}
            <span className="text-gray-400 font-normal">— opcional</span>
          </label>
          <input
            type="number"
            value={data.weightOneYearAgo ?? ""}
            onChange={(e) =>
              updateData({
                weightOneYearAgo: e.target.value
                  ? parseFloat(e.target.value)
                  : undefined,
              })
            }
            placeholder="72"
            min={30}
            max={300}
            step={0.1}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Peso hace 5 años (kg){" "}
            <span className="text-gray-400 font-normal">— opcional</span>
          </label>
          <input
            type="number"
            value={data.weightFiveYearsAgo ?? ""}
            onChange={(e) =>
              updateData({
                weightFiveYearsAgo: e.target.value
                  ? parseFloat(e.target.value)
                  : undefined,
              })
            }
            placeholder="68"
            min={30}
            max={300}
            step={0.1}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
          />
        </div>
      </div>

      {/* Pesaje consistente */}
      <div>
        <label className="flex items-center gap-3 cursor-pointer">
          <button
            type="button"
            onClick={() =>
              updateData({ consistentWeighing: !data.consistentWeighing })
            }
            className={`relative w-12 h-7 rounded-full transition-colors ${
              data.consistentWeighing ? "bg-emerald-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                data.consistentWeighing ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
          <span className="text-sm font-medium text-gray-700">
            Me peso de manera consistente (misma hora, misma báscula)
          </span>
        </label>
      </div>
    </div>
  );
}
