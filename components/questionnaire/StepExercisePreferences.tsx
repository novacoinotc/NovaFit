"use client";

import { QuestionnaireData } from "@/types";

interface StepProps {
  data: QuestionnaireData;
  updateData: (updates: Partial<QuestionnaireData>) => void;
}

const EQUIPMENT_OPTIONS = [
  "Mancuernas",
  "Barra y discos",
  "Bandas elásticas",
  "Kettlebell",
  "TRX/Suspensión",
  "Bicicleta estática",
  "Caminadora",
  "Tapete de yoga",
  "Barra de dominadas",
  "Ninguno",
];

const EXERCISE_INTERESTS = [
  "Entrenamiento de fuerza",
  "HIIT",
  "Cardio tradicional",
  "Yoga",
  "Pilates",
  "Natación",
  "Correr",
  "Ciclismo",
  "Baile/Zumba",
  "CrossFit",
  "Calistenia",
  "Artes marciales",
  "Escalada",
  "Deportes de equipo",
  "Caminata/Senderismo",
];

function ChipSelector({
  options,
  selected,
  onChange,
}: {
  options: string[];
  selected: string[];
  onChange: (values: string[]) => void;
}) {
  const toggleOption = (option: string) => {
    if (option === "Ninguno") {
      onChange(selected.includes(option) ? [] : [option]);
      return;
    }
    const withoutNone = selected.filter((s) => s !== "Ninguno");
    if (withoutNone.includes(option)) {
      onChange(withoutNone.filter((s) => s !== option));
    } else {
      onChange([...withoutNone, option]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => toggleOption(option)}
          className={`px-3 py-2 sm:py-1.5 rounded-full text-sm font-medium border transition min-h-[44px] sm:min-h-0 ${
            selected.includes(option)
              ? "border-emerald-500 bg-emerald-50 text-emerald-700"
              : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default function StepExercisePreferences({
  data,
  updateData,
}: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
          Preferencias de Ejercicio
        </h2>
        <p className="text-gray-500 mt-1 text-sm sm:text-base">
          Diseñaremos un plan de ejercicio que se adapte a tus gustos y
          posibilidades.
        </p>
      </div>

      {/* Lugar de entrenamiento */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          ¿Dónde prefieres entrenar?
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { value: "home" as const, label: "Casa", icon: "🏠" },
            { value: "gym" as const, label: "Gimnasio", icon: "🏋️" },
            { value: "outdoor" as const, label: "Aire libre", icon: "🌳" },
            { value: "mixed" as const, label: "Mixto", icon: "🔄" },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => updateData({ trainingLocation: opt.value })}
              className={`rounded-xl border p-3 sm:p-4 text-center transition min-h-[44px] ${
                data.trainingLocation === opt.value
                  ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/20"
                  : "border-gray-300 bg-white hover:border-gray-400"
              }`}
            >
              <span className="text-2xl block mb-1">{opt.icon}</span>
              <span
                className={`text-sm font-semibold ${
                  data.trainingLocation === opt.value
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

      {/* Equipo en casa */}
      {(data.trainingLocation === "home" ||
        data.trainingLocation === "mixed") && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Equipo disponible en casa
          </label>
          <ChipSelector
            options={EQUIPMENT_OPTIONS}
            selected={data.homeEquipment}
            onChange={(values) => updateData({ homeEquipment: values })}
          />
        </div>
      )}

      {/* Tiempo y días disponibles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tiempo por sesión (min)
          </label>
          <input
            type="number"
            value={data.exerciseTimeMinutes || ""}
            onChange={(e) =>
              updateData({
                exerciseTimeMinutes: parseInt(e.target.value) || 0,
              })
            }
            min={10}
            max={180}
            step={5}
            placeholder="45"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Días disponibles por semana
          </label>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6, 7].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => updateData({ availableDaysPerWeek: n })}
                className={`w-10 h-10 rounded-xl border text-sm font-semibold transition min-h-[44px] ${
                  data.availableDaysPerWeek === n
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Horario preferido */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Horario preferido para entrenar
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { value: "morning" as const, label: "Mañana", time: "6-12h" },
            { value: "afternoon" as const, label: "Tarde", time: "12-18h" },
            { value: "night" as const, label: "Noche", time: "18-22h" },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() =>
                updateData({ preferredTrainingTime: opt.value })
              }
              className={`rounded-xl border p-3 text-center transition min-h-[44px] ${
                data.preferredTrainingTime === opt.value
                  ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/20"
                  : "border-gray-300 bg-white hover:border-gray-400"
              }`}
            >
              <span
                className={`block text-sm font-semibold ${
                  data.preferredTrainingTime === opt.value
                    ? "text-emerald-700"
                    : "text-gray-800"
                }`}
              >
                {opt.label}
              </span>
              <span className="block text-xs text-gray-500 mt-0.5">
                {opt.time}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Ejercicios que disfrutan/no */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ejercicios que disfrutas
        </label>
        <input
          type="text"
          value={data.enjoyedExercises}
          onChange={(e) => updateData({ enjoyedExercises: e.target.value })}
          placeholder="Ej: Sentadillas, correr, nadar..."
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ejercicios que no te gustan
        </label>
        <input
          type="text"
          value={data.dislikedExercises}
          onChange={(e) => updateData({ dislikedExercises: e.target.value })}
          placeholder="Ej: Burpees, correr larga distancia..."
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
        />
      </div>

      {/* Intereses */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Actividades que te interesan explorar
        </label>
        <ChipSelector
          options={EXERCISE_INTERESTS}
          selected={data.exerciseInterest}
          onChange={(values) => updateData({ exerciseInterest: values })}
        />
      </div>
    </div>
  );
}
