"use client";

import { QuestionnaireData } from "@/types";

interface StepProps {
  data: QuestionnaireData;
  updateData: (updates: Partial<QuestionnaireData>) => void;
}

const EXERCISE_TYPES = [
  "Pesas/fuerza",
  "Cardio (correr, bici, nadar)",
  "CrossFit/funcional",
  "Calistenia",
  "Yoga/Pilates",
  "Deportes (fútbol, basketball, etc.)",
  "Artes marciales",
  "Caminata",
  "HIIT",
  "Otro",
];

export default function StepCurrentExercise({ data, updateData }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Ejercicio Actual</h2>
        <p className="text-gray-500 mt-1">
          Cuéntanos sobre tu actividad física actual.
        </p>
      </div>

      {/* Actualmente haciendo ejercicio */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          ¿Realizas ejercicio actualmente?
        </label>
        <div className="flex gap-3">
          {[
            { value: true, label: "Sí, hago ejercicio" },
            { value: false, label: "No, actualmente no" },
          ].map((opt) => (
            <button
              key={String(opt.value)}
              type="button"
              onClick={() => updateData({ currentlyExercising: opt.value })}
              className={`flex-1 rounded-xl border p-4 text-center transition ${
                data.currentlyExercising === opt.value
                  ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/20"
                  : "border-gray-300 bg-white hover:border-gray-400"
              }`}
            >
              <span
                className={`text-sm font-semibold ${
                  data.currentlyExercising === opt.value
                    ? "text-emerald-700"
                    : "text-gray-800"
                }`}
              >
                {opt.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {data.currentlyExercising && (
        <>
          {/* Tipo de ejercicio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de ejercicio
            </label>
            <div className="flex flex-wrap gap-2">
              {EXERCISE_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => updateData({ currentExerciseType: type })}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border transition ${
                    data.currentExerciseType === type
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Frecuencia y duración */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Días por semana
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => updateData({ weeklyFrequency: n })}
                    className={`w-10 h-10 rounded-xl border text-sm font-semibold transition ${
                      data.weeklyFrequency === n
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                        : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duración por sesión (min)
              </label>
              <input
                type="number"
                value={data.sessionDuration || ""}
                onChange={(e) =>
                  updateData({
                    sessionDuration: parseInt(e.target.value) || 0,
                  })
                }
                min={10}
                max={300}
                step={5}
                placeholder="60"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
              />
            </div>
          </div>
        </>
      )}

      {/* Nivel de experiencia */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nivel de experiencia con ejercicio
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            {
              value: "beginner" as const,
              label: "Principiante",
              desc: "Menos de 6 meses",
            },
            {
              value: "intermediate" as const,
              label: "Intermedio",
              desc: "6 meses a 2 años",
            },
            {
              value: "advanced" as const,
              label: "Avanzado",
              desc: "Más de 2 años",
            },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => updateData({ exerciseExperience: opt.value })}
              className={`rounded-xl border p-3 text-center transition ${
                data.exerciseExperience === opt.value
                  ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/20"
                  : "border-gray-300 bg-white hover:border-gray-400"
              }`}
            >
              <span
                className={`block text-sm font-semibold ${
                  data.exerciseExperience === opt.value
                    ? "text-emerald-700"
                    : "text-gray-800"
                }`}
              >
                {opt.label}
              </span>
              <span className="block text-xs text-gray-500 mt-0.5">
                {opt.desc}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Tiempo entrenando */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          ¿Cuánto tiempo llevas entrenando?
        </label>
        <input
          type="text"
          value={data.trainingDuration}
          onChange={(e) => updateData({ trainingDuration: e.target.value })}
          placeholder="Ej: 3 meses, 2 años, acabo de empezar..."
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
        />
      </div>
    </div>
  );
}
