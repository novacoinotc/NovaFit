"use client";

import { useMemo, useCallback } from "react";
import { QuestionnaireData } from "@/types";

interface StepProps {
  data: QuestionnaireData;
  updateData: (updates: Partial<QuestionnaireData>) => void;
}

const PRIORITY_OPTIONS = [
  "Sabor",
  "Practicidad",
  "Costo",
  "Resultados rápidos",
  "Salud",
];

const GOAL_LABELS: Record<string, string> = {
  lose_fat: "Perder grasa",
  gain_muscle: "Ganar músculo",
  recomposition: "Recomposición corporal",
  improve_health: "Mejorar salud",
  athletic_performance: "Rendimiento deportivo",
  maintain_weight: "Mantener peso",
};

const BODY_TYPE_LABELS: Record<string, string> = {
  ectomorph: "Ectomorfo",
  mesomorph: "Mesomorfo",
  endomorph: "Endomorfo",
};

const WORK_TYPE_LABELS: Record<string, string> = {
  sedentary: "Sedentario",
  moderate: "Moderado",
  physical: "Físico",
};

const DIET_TYPE_LABELS: Record<string, string> = {
  omnivore: "Omnívoro",
  vegetarian: "Vegetariano",
  vegan: "Vegano",
  keto: "Keto/Low-carb",
  mediterranean: "Mediterránea",
  no_preference: "Sin preferencia",
};

const EXPERIENCE_LABELS: Record<string, string> = {
  beginner: "Principiante",
  intermediate: "Intermedio",
  advanced: "Avanzado",
};

const LOCATION_LABELS: Record<string, string> = {
  home: "Casa",
  gym: "Gimnasio",
  outdoor: "Aire libre",
  mixed: "Mixto",
};

const STRICTNESS_LABELS: Record<string, string> = {
  flexible: "Flexible",
  moderate: "Moderado",
  strict: "Estricto",
};

function SummarySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
      </div>
      <div className="px-4 py-3 space-y-1.5">{children}</div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  if (!value || value === "0") return null;
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-800 font-medium text-right max-w-[60%]">
        {value}
      </span>
    </div>
  );
}

function SummaryChips({ label, items }: { label: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div className="text-sm">
      <span className="text-gray-500 block mb-1">{label}</span>
      <div className="flex flex-wrap gap-1">
        {items.map((item) => (
          <span
            key={item}
            className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function StepConfirmation({ data, updateData }: StepProps) {
  const priorities = useMemo(
    () => (data.priorities.length ? data.priorities : []),
    [data.priorities]
  );

  const moveUp = useCallback(
    (index: number) => {
      if (index === 0) return;
      const newPriorities = [...priorities];
      [newPriorities[index - 1], newPriorities[index]] = [
        newPriorities[index],
        newPriorities[index - 1],
      ];
      updateData({ priorities: newPriorities });
    },
    [priorities, updateData]
  );

  const moveDown = useCallback(
    (index: number) => {
      if (index === priorities.length - 1) return;
      const newPriorities = [...priorities];
      [newPriorities[index], newPriorities[index + 1]] = [
        newPriorities[index + 1],
        newPriorities[index],
      ];
      updateData({ priorities: newPriorities });
    },
    [priorities, updateData]
  );

  const togglePriority = useCallback(
    (option: string) => {
      if (priorities.includes(option)) {
        updateData({ priorities: priorities.filter((p) => p !== option) });
      } else {
        updateData({ priorities: [...priorities, option] });
      }
    },
    [priorities, updateData]
  );

  const bmi =
    data.height && data.currentWeight
      ? (data.currentWeight / Math.pow(data.height / 100, 2)).toFixed(1)
      : null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
          Confirma tus Respuestas
        </h2>
        <p className="text-gray-500 mt-1 text-sm sm:text-base">
          Revisa el resumen y ordena tus prioridades antes de generar tu plan.
        </p>
      </div>

      <div className="space-y-4">
        <SummarySection title="Datos Personales">
          <SummaryRow label="Nombre" value={data.name} />
          <SummaryRow
            label="Edad / Sexo"
            value={`${data.age} años / ${data.biologicalSex === "male" ? "Masculino" : "Femenino"}`}
          />
          <SummaryRow label="Estatura" value={`${data.height} cm`} />
          <SummaryRow label="Peso actual" value={`${data.currentWeight} kg`} />
          {data.goalWeight && (
            <SummaryRow label="Peso objetivo" value={`${data.goalWeight} kg`} />
          )}
          {bmi && <SummaryRow label="IMC calculado" value={bmi} />}
          <SummaryRow label="País" value={data.country} />
        </SummarySection>

        <SummarySection title="Métricas Corporales">
          {data.bodyFatPercentage && (
            <SummaryRow
              label="Grasa corporal"
              value={`${data.bodyFatPercentage}%`}
            />
          )}
          {data.waistMeasurement && (
            <SummaryRow
              label="Cintura"
              value={`${data.waistMeasurement} cm`}
            />
          )}
          {data.hipMeasurement && (
            <SummaryRow label="Cadera" value={`${data.hipMeasurement} cm`} />
          )}
          {data.bodyType && (
            <SummaryRow
              label="Tipo de cuerpo"
              value={BODY_TYPE_LABELS[data.bodyType] || data.bodyType}
            />
          )}
          {data.weightOneYearAgo && (
            <SummaryRow
              label="Peso hace 1 año"
              value={`${data.weightOneYearAgo} kg`}
            />
          )}
        </SummarySection>

        <SummarySection title="Salud">
          <SummaryChips
            label="Condiciones médicas"
            items={data.medicalConditions}
          />
          <SummaryChips label="Alergias" items={data.foodAllergies} />
          <SummaryChips label="Intolerancias" items={data.intolerances} />
          <SummaryChips
            label="Problemas digestivos"
            items={data.digestiveIssues}
          />
          {data.currentMedications && (
            <SummaryRow label="Medicamentos" value={data.currentMedications} />
          )}
          {data.physicalLimitations && (
            <SummaryRow
              label="Limitaciones"
              value={data.physicalLimitations}
            />
          )}
        </SummarySection>

        <SummarySection title="Objetivo">
          <SummaryRow
            label="Objetivo principal"
            value={GOAL_LABELS[data.mainGoal] || ""}
          />
          <SummaryRow label="Plazo" value={data.desiredTimeline} />
          {data.specificEvent && (
            <SummaryRow label="Evento" value={data.specificEvent} />
          )}
        </SummarySection>

        <SummarySection title="Estilo de Vida">
          <SummaryRow
            label="Tipo de trabajo"
            value={WORK_TYPE_LABELS[data.workType] || ""}
          />
          <SummaryRow
            label="Sueño"
            value={`${data.averageSleepHours}h (${data.wakeUpTime} - ${data.bedTime})`}
          />
          <SummaryRow
            label="Estrés"
            value={`${data.stressLevel}/5`}
          />
          <SummaryRow
            label="Agua"
            value={`${data.dailyWaterLiters} L/día`}
          />
        </SummarySection>

        <SummarySection title="Alimentación">
          <SummaryRow
            label="Tipo de dieta"
            value={DIET_TYPE_LABELS[data.dietType] || ""}
          />
          <SummaryChips label="Alimentos favoritos" items={data.lovedFoods} />
          <SummaryChips label="Alimentos que evita" items={data.hatedFoods} />
          <SummaryRow
            label="Habilidad cocina"
            value={`${data.cookingSkill}/5`}
          />
          <SummaryRow
            label="Tiempo cocina"
            value={`${data.cookingTimeMinutes} min`}
          />
          <SummaryRow
            label="Comidas al día"
            value={String(data.mealsPerDay)}
          />
        </SummarySection>

        <SummarySection title="Ejercicio">
          <SummaryRow
            label="Actualmente ejercitándose"
            value={data.currentlyExercising ? "Sí" : "No"}
          />
          {data.currentExerciseType && (
            <SummaryRow label="Tipo" value={data.currentExerciseType} />
          )}
          <SummaryRow
            label="Experiencia"
            value={EXPERIENCE_LABELS[data.exerciseExperience] || ""}
          />
          <SummaryRow
            label="Lugar"
            value={LOCATION_LABELS[data.trainingLocation] || ""}
          />
          <SummaryRow
            label="Días disponibles"
            value={`${data.availableDaysPerWeek} días/semana`}
          />
          <SummaryChips
            label="Intereses"
            items={data.exerciseInterest}
          />
        </SummarySection>

        <SummarySection title="Preferencias del Plan">
          <SummaryRow
            label="Rigidez"
            value={STRICTNESS_LABELS[data.planStrictness] || ""}
          />
          <SummaryRow
            label="Variedad"
            value={
              data.varietyPreference === "variety"
                ? "Mucha variedad"
                : data.varietyPreference === "repeat"
                  ? "Repetir está bien"
                  : ""
            }
          />
          <SummaryRow
            label="Meal prep"
            value={data.needsMealPrep ? "Sí" : "No"}
          />
          <SummaryRow
            label="Motivación"
            value={`${data.motivationLevel}/10`}
          />
        </SummarySection>
      </div>

      {/* Priorities Ranking */}
      <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3 sm:p-5">
        <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-1">
          Ordena tus Prioridades
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Selecciona y ordena lo que más te importa. Usa las flechas para
          reorganizar.
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {PRIORITY_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => togglePriority(option)}
              className={`px-4 py-2.5 sm:py-2 rounded-full text-sm font-medium border transition min-h-[44px] sm:min-h-0 ${
                priorities.includes(option)
                  ? "border-emerald-500 bg-emerald-100 text-emerald-700"
                  : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
              }`}
            >
              {priorities.includes(option) && (
                <span className="mr-1.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-600 text-white text-xs font-bold">
                  {priorities.indexOf(option) + 1}
                </span>
              )}
              {option}
            </button>
          ))}
        </div>

        {priorities.length > 0 && (
          <div className="space-y-2">
            {priorities.map((priority, index) => (
              <div
                key={priority}
                className="flex items-center gap-3 bg-white rounded-xl border border-gray-200 px-4 py-3"
              >
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-emerald-600 text-white text-sm font-bold shrink-0">
                  {index + 1}
                </span>
                <span className="text-sm font-medium text-gray-800 flex-1">
                  {priority}
                </span>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                    className={`p-1 rounded transition ${
                      index === 0
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-500 hover:text-emerald-600 hover:bg-emerald-50"
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => moveDown(index)}
                    disabled={index === priorities.length - 1}
                    className={`p-1 rounded transition ${
                      index === priorities.length - 1
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-500 hover:text-emerald-600 hover:bg-emerald-50"
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => togglePriority(priority)}
                    className="p-1 rounded text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {priorities.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-4">
            Selecciona al menos una prioridad de las opciones de arriba.
          </p>
        )}
      </div>
    </div>
  );
}
