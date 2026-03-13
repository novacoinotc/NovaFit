"use client";

import { QuestionnaireData } from "@/types";

interface StepProps {
  data: QuestionnaireData;
  updateData: (updates: Partial<QuestionnaireData>) => void;
}

const COUNTRIES = [
  "México",
  "Colombia",
  "Argentina",
  "España",
  "Chile",
  "Perú",
  "Ecuador",
  "Venezuela",
  "Guatemala",
  "Cuba",
  "Bolivia",
  "República Dominicana",
  "Honduras",
  "Paraguay",
  "El Salvador",
  "Nicaragua",
  "Costa Rica",
  "Panamá",
  "Uruguay",
  "Puerto Rico",
  "Estados Unidos",
  "Otro",
];

export default function StepPersonalData({ data, updateData }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Datos Personales</h2>
        <p className="text-gray-500 mt-1">
          Cuéntanos sobre ti para personalizar tu plan.
        </p>
      </div>

      {/* Nombre */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre
        </label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => updateData({ name: e.target.value })}
          placeholder="Tu nombre"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
        />
      </div>

      {/* Edad y Sexo */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Edad
          </label>
          <input
            type="number"
            value={data.age || ""}
            onChange={(e) => updateData({ age: parseInt(e.target.value) || 0 })}
            placeholder="25"
            min={10}
            max={120}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sexo biológico
          </label>
          <div className="flex gap-2">
            {[
              { value: "male" as const, label: "Masculino" },
              { value: "female" as const, label: "Femenino" },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => updateData({ biologicalSex: option.value })}
                className={`flex-1 rounded-xl border px-4 py-3 text-sm font-medium transition ${
                  data.biologicalSex === option.value
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Estatura y Peso */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estatura (cm)
          </label>
          <input
            type="number"
            value={data.height || ""}
            onChange={(e) =>
              updateData({ height: parseFloat(e.target.value) || 0 })
            }
            placeholder="170"
            min={100}
            max={250}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Peso actual (kg)
          </label>
          <input
            type="number"
            value={data.currentWeight || ""}
            onChange={(e) =>
              updateData({ currentWeight: parseFloat(e.target.value) || 0 })
            }
            placeholder="70"
            min={30}
            max={300}
            step={0.1}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
          />
        </div>
      </div>

      {/* Peso objetivo */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Peso objetivo (kg){" "}
          <span className="text-gray-400 font-normal">— opcional</span>
        </label>
        <input
          type="number"
          value={data.goalWeight ?? ""}
          onChange={(e) =>
            updateData({
              goalWeight: e.target.value
                ? parseFloat(e.target.value)
                : undefined,
            })
          }
          placeholder="65"
          min={30}
          max={300}
          step={0.1}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
        />
      </div>

      {/* País */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          País de residencia
        </label>
        <select
          value={data.country}
          onChange={(e) => updateData({ country: e.target.value })}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition appearance-none bg-white"
        >
          <option value="">Selecciona tu país</option>
          {COUNTRIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
