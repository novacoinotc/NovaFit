"use client";

import { useState } from "react";
import { NutritionPlan } from "@/types";

interface PlanTabsProps {
  plan: NutritionPlan;
}

const TABS = [
  { id: "resumen", label: "Resumen" },
  { id: "alimentacion", label: "Plan Alimenticio" },
  { id: "ejercicio", label: "Plan de Ejercicio" },
  { id: "compras", label: "Lista de Compras" },
  { id: "tips", label: "Tips y Sustituciones" },
];

export default function PlanTabs({ plan }: PlanTabsProps) {
  const [activeTab, setActiveTab] = useState("resumen");
  const [expandedDays, setExpandedDays] = useState<Record<string, boolean>>({});

  const toggleDay = (day: string) => {
    setExpandedDays((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  return (
    <div>
      {/* Tab navigation */}
      <div className="flex gap-1 overflow-x-auto pb-1 mb-4 sm:mb-6 border-b border-gray-200 scrollbar-hide -mx-1 px-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium whitespace-nowrap border-b-2 transition min-h-[44px] shrink-0 ${
              activeTab === tab.id
                ? "border-emerald-600 text-emerald-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="min-h-[400px]">
        {/* RESUMEN */}
        {activeTab === "resumen" && (
          <div className="space-y-6">
            <div className="bg-emerald-50 rounded-2xl p-4 sm:p-6 border border-emerald-100">
              <h3 className="text-base sm:text-lg font-bold text-emerald-800 mb-3">
                Resumen de tu Perfil
              </h3>
              <p className="text-emerald-700 leading-relaxed whitespace-pre-line">
                {plan.profileSummary}
              </p>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
                Macronutrientes Diarios
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <MacroCard
                  label="Calorias"
                  value={plan.macros.calories}
                  unit="kcal"
                  color="bg-orange-50 border-orange-100 text-orange-700"
                />
                <MacroCard
                  label="Proteina"
                  value={plan.macros.protein}
                  unit="g"
                  color="bg-red-50 border-red-100 text-red-700"
                />
                <MacroCard
                  label="Carbohidratos"
                  value={plan.macros.carbs}
                  unit="g"
                  color="bg-blue-50 border-blue-100 text-blue-700"
                />
                <MacroCard
                  label="Grasas"
                  value={plan.macros.fats}
                  unit="g"
                  color="bg-yellow-50 border-yellow-100 text-yellow-700"
                />
              </div>
            </div>
          </div>
        )}

        {/* PLAN ALIMENTICIO */}
        {activeTab === "alimentacion" && (
          <div className="space-y-4">
            {plan.weeklyMealPlan.map((day) => (
              <div
                key={day.day}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleDay(`meal-${day.day}`)}
                  className="w-full flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 hover:bg-gray-50 transition min-h-[44px]"
                >
                  <span className="font-bold text-gray-900">{day.day}</span>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      expandedDays[`meal-${day.day}`] ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>
                {expandedDays[`meal-${day.day}`] && (
                  <div className="px-3 sm:px-6 pb-4 space-y-4 border-t border-gray-100">
                    {day.meals.map((meal, idx) => (
                      <div key={idx} className="pt-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-1">
                          <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
                            {meal.name}
                          </h4>
                          <span className="text-xs sm:text-sm text-gray-500">
                            {meal.time} &middot; {meal.totalCalories} kcal
                          </span>
                        </div>
                        <div className="space-y-1">
                          {meal.foods.map((food, fIdx) => (
                            <div
                              key={fIdx}
                              className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm py-1.5 sm:py-1 border-b border-gray-50 last:border-0"
                            >
                              <div>
                                <span className="text-gray-800">
                                  {food.name}
                                </span>
                                <span className="text-gray-400 ml-2">
                                  {food.quantity}
                                </span>
                              </div>
                              <div className="flex gap-2 sm:gap-3 text-xs text-gray-500 mt-0.5 sm:mt-0">
                                <span>{food.calories} kcal</span>
                                <span>P: {food.protein}g</span>
                                <span>C: {food.carbs}g</span>
                                <span>G: {food.fats}g</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        {meal.foods.some((f) => f.recipe) && (
                          <div className="mt-2">
                            {meal.foods
                              .filter((f) => f.recipe)
                              .map((f, rIdx) => (
                                <details
                                  key={rIdx}
                                  className="text-sm text-gray-600"
                                >
                                  <summary className="cursor-pointer text-emerald-600 hover:text-emerald-700 font-medium">
                                    Receta: {f.name}
                                  </summary>
                                  <p className="mt-1 pl-4 text-gray-500 whitespace-pre-line">
                                    {f.recipe}
                                  </p>
                                </details>
                              ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* PLAN DE EJERCICIO */}
        {activeTab === "ejercicio" && (
          <div className="space-y-4">
            {plan.exercisePlan.map((day) => (
              <div
                key={day.day}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleDay(`exercise-${day.day}`)}
                  className="w-full flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 hover:bg-gray-50 transition min-h-[44px]"
                >
                  <div className="text-left">
                    <span className="font-bold text-gray-900 text-sm sm:text-base">{day.day}</span>
                    <span className="text-xs sm:text-sm text-gray-500 ml-2 sm:ml-3">
                      {day.focus} &middot; {day.duration} min
                    </span>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      expandedDays[`exercise-${day.day}`] ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>
                {expandedDays[`exercise-${day.day}`] && (
                  <div className="px-3 sm:px-6 pb-4 border-t border-gray-100">
                    <div className="divide-y divide-gray-50">
                      {day.exercises.map((exercise, idx) => (
                        <div
                          key={idx}
                          className="py-3 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-0"
                        >
                          <div>
                            <p className="font-medium text-gray-800 text-sm sm:text-base">
                              {exercise.name}
                            </p>
                            {exercise.notes && (
                              <p className="text-xs text-gray-400 mt-0.5">
                                {exercise.notes}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500 sm:shrink-0 sm:ml-4">
                            {exercise.sets && (
                              <span className="bg-gray-100 sm:bg-transparent rounded px-1.5 sm:px-0 py-0.5 sm:py-0">{exercise.sets} series</span>
                            )}
                            {exercise.reps && <span className="bg-gray-100 sm:bg-transparent rounded px-1.5 sm:px-0 py-0.5 sm:py-0">{exercise.reps} reps</span>}
                            {exercise.duration && (
                              <span className="bg-gray-100 sm:bg-transparent rounded px-1.5 sm:px-0 py-0.5 sm:py-0">{exercise.duration}</span>
                            )}
                            {exercise.rest && (
                              <span className="bg-gray-100 sm:bg-transparent rounded px-1.5 sm:px-0 py-0.5 sm:py-0 text-gray-400">
                                Desc: {exercise.rest}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    {day.notes && (
                      <div className="mt-3 bg-emerald-50 rounded-lg p-3 text-sm text-emerald-700">
                        {day.notes}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* LISTA DE COMPRAS */}
        {activeTab === "compras" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {plan.shoppingList.map((category) => (
              <div
                key={category.category}
                className="bg-white rounded-xl border border-gray-200 p-5"
              >
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                  {category.category}
                </h4>
                <ul className="space-y-1.5">
                  {category.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-gray-700">{item.name}</span>
                      <span className="text-gray-400 ml-auto">
                        {item.quantity}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* TIPS Y SUSTITUCIONES */}
        {activeTab === "tips" && (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Tips Nutricionales
              </h3>
              <div className="space-y-3">
                {plan.tips.map((tip, idx) => (
                  <div
                    key={idx}
                    className="flex gap-3 bg-emerald-50 rounded-xl p-4 border border-emerald-100"
                  >
                    <div className="w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-emerald-800 text-sm leading-relaxed">
                      {tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Sustituciones Sugeridas
              </h3>
              <div className="space-y-3">
                {plan.substitutions.map((sub, idx) => (
                  <div
                    key={idx}
                    className="flex gap-3 bg-blue-50 rounded-xl p-4 border border-blue-100"
                  >
                    <svg
                      className="w-5 h-5 text-blue-600 shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                      />
                    </svg>
                    <p className="text-blue-800 text-sm leading-relaxed">
                      {sub}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MacroCard({
  label,
  value,
  unit,
  color,
}: {
  label: string;
  value: number;
  unit: string;
  color: string;
}) {
  return (
    <div className={`rounded-xl border p-4 text-center ${color}`}>
      <p className="text-2xl font-bold">
        {value.toLocaleString()}
        <span className="text-sm font-normal ml-1">{unit}</span>
      </p>
      <p className="text-sm font-medium mt-1">{label}</p>
    </div>
  );
}
