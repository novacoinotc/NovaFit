"use client";

import { useState } from "react";
import { QuestionnaireData } from "@/types";

interface StepProps {
  data: QuestionnaireData;
  updateData: (updates: Partial<QuestionnaireData>) => void;
}

const DIET_TYPES = [
  { value: "omnivore" as const, label: "Omnívoro", desc: "Como de todo" },
  {
    value: "vegetarian" as const,
    label: "Vegetariano",
    desc: "Sin carne ni pescado",
  },
  {
    value: "vegan" as const,
    label: "Vegano",
    desc: "Sin productos animales",
  },
  {
    value: "keto" as const,
    label: "Keto/Low-carb",
    desc: "Bajo en carbohidratos",
  },
  {
    value: "mediterranean" as const,
    label: "Mediterránea",
    desc: "Aceite de oliva, pescado, granos",
  },
  {
    value: "no_preference" as const,
    label: "Sin preferencia",
    desc: "Abierto a sugerencias",
  },
];

const COMMON_FOODS = [
  "Pollo",
  "Carne de res",
  "Cerdo",
  "Pescado",
  "Mariscos",
  "Huevos",
  "Arroz",
  "Pasta",
  "Pan",
  "Avena",
  "Brócoli",
  "Espinaca",
  "Aguacate",
  "Plátano",
  "Frijoles/Lentejas",
  "Quinoa",
  "Papa/Patata",
  "Tomate",
  "Yogurt",
  "Frutos secos",
];

function FoodTagInput({
  label,
  tags,
  onChange,
  placeholder,
  suggestions,
}: {
  label: string;
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder: string;
  suggestions: string[];
}) {
  const [input, setInput] = useState("");

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
    }
    setInput("");
  };

  const removeTag = (tag: string) => {
    onChange(tags.filter((t) => t !== tag));
  };

  const filteredSuggestions = suggestions.filter(
    (s) =>
      !tags.includes(s) && s.toLowerCase().includes(input.toLowerCase()) && input
  );

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium border border-emerald-200"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-0.5 text-emerald-500 hover:text-emerald-700"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag(input);
            }
          }}
          placeholder={placeholder}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
        />
        {filteredSuggestions.length > 0 && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-40 overflow-y-auto">
            {filteredSuggestions.slice(0, 6).map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => addTag(suggestion)}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function StepFoodPreferences({ data, updateData }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
          Preferencias Alimenticias
        </h2>
        <p className="text-gray-500 mt-1 text-sm sm:text-base">
          Dinos qué te gusta comer para diseñar un plan que disfrutes.
        </p>
      </div>

      {/* Tipo de dieta */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tipo de alimentación
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {DIET_TYPES.map((diet) => (
            <button
              key={diet.value}
              type="button"
              onClick={() => updateData({ dietType: diet.value })}
              className={`rounded-xl border p-3 text-left transition min-h-[44px] ${
                data.dietType === diet.value
                  ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/20"
                  : "border-gray-300 bg-white hover:border-gray-400"
              }`}
            >
              <span
                className={`block text-sm font-semibold ${
                  data.dietType === diet.value
                    ? "text-emerald-700"
                    : "text-gray-800"
                }`}
              >
                {diet.label}
              </span>
              <span className="block text-xs text-gray-500 mt-0.5">
                {diet.desc}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Alimentos favoritos y no gustados */}
      <FoodTagInput
        label="Alimentos que te encantan"
        tags={data.lovedFoods}
        onChange={(tags) => updateData({ lovedFoods: tags })}
        placeholder="Escribe un alimento y presiona Enter..."
        suggestions={COMMON_FOODS}
      />

      <FoodTagInput
        label="Alimentos que no te gustan"
        tags={data.hatedFoods}
        onChange={(tags) => updateData({ hatedFoods: tags })}
        placeholder="Escribe un alimento y presiona Enter..."
        suggestions={COMMON_FOODS}
      />

      {/* Habilidad y tiempo de cocina */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Habilidad en la cocina:{" "}
            <span className="text-emerald-600 font-semibold">
              {data.cookingSkill}/5
            </span>
          </label>
          <input
            type="range"
            value={data.cookingSkill}
            onChange={(e) =>
              updateData({ cookingSkill: parseInt(e.target.value) })
            }
            min={1}
            max={5}
            step={1}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Básico</span>
            <span>Chef</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tiempo para cocinar (min)
          </label>
          <input
            type="number"
            value={data.cookingTimeMinutes || ""}
            onChange={(e) =>
              updateData({
                cookingTimeMinutes: parseInt(e.target.value) || 0,
              })
            }
            min={5}
            max={180}
            step={5}
            placeholder="30"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
          />
        </div>
      </div>

      {/* Presupuesto */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Presupuesto para alimentación
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              value: "low" as const,
              label: "Económico",
              desc: "Lo más accesible",
            },
            {
              value: "medium" as const,
              label: "Moderado",
              desc: "Balance calidad-precio",
            },
            {
              value: "high" as const,
              label: "Sin límite",
              desc: "Lo que haga falta",
            },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => updateData({ foodBudget: opt.value })}
              className={`rounded-xl border p-3 text-center transition min-h-[44px] ${
                data.foodBudget === opt.value
                  ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/20"
                  : "border-gray-300 bg-white hover:border-gray-400"
              }`}
            >
              <span
                className={`block text-sm font-semibold ${
                  data.foodBudget === opt.value
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

      {/* Comidas al día */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Comidas al día
        </label>
        <div className="flex gap-2">
          {[2, 3, 4, 5, 6].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => updateData({ mealsPerDay: n })}
              className={`w-12 h-12 rounded-xl border text-sm font-semibold transition min-h-[44px] ${
                data.mealsPerDay === n
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                  : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Comer fuera, alcohol, snacking */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Comer fuera
          </label>
          <div className="space-y-2">
            {[
              { value: "never" as const, label: "Nunca/rara vez" },
              { value: "1_2_weekly" as const, label: "1-2 veces/semana" },
              { value: "almost_daily" as const, label: "Casi diario" },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => updateData({ eatingOut: opt.value })}
                className={`w-full rounded-lg border px-3 py-2 text-xs font-medium text-left transition ${
                  data.eatingOut === opt.value
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Consumo de alcohol
          </label>
          <div className="space-y-2">
            {[
              { value: "never" as const, label: "Nunca" },
              { value: "occasional" as const, label: "Ocasional" },
              { value: "frequent" as const, label: "Frecuente" },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => updateData({ alcoholConsumption: opt.value })}
                className={`w-full rounded-lg border px-3 py-2 text-xs font-medium text-left transition ${
                  data.alcoholConsumption === opt.value
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Picoteo entre comidas
          </label>
          <div className="space-y-2">
            {[
              { value: "never" as const, label: "Nunca" },
              { value: "sometimes" as const, label: "A veces" },
              { value: "always" as const, label: "Siempre" },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => updateData({ snacking: opt.value })}
                className={`w-full rounded-lg border px-3 py-2 text-xs font-medium text-left transition ${
                  data.snacking === opt.value
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Snacks tipo */}
      {data.snacking && data.snacking !== "never" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de snacks que sueles comer
          </label>
          <input
            type="text"
            value={data.snackTypes}
            onChange={(e) => updateData({ snackTypes: e.target.value })}
            placeholder="Ej: Frutas, galletas, papas fritas, barras de cereal..."
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
          />
        </div>
      )}

      {/* Suplementos */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Suplementos actuales{" "}
          <span className="text-gray-400 font-normal">— opcional</span>
        </label>
        <input
          type="text"
          value={data.currentSupplements}
          onChange={(e) => updateData({ currentSupplements: e.target.value })}
          placeholder="Ej: Proteína whey, creatina, vitamina D..."
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
        />
      </div>

      {/* Acceso a tiendas especializadas */}
      <div>
        <label className="flex items-center gap-3 cursor-pointer">
          <button
            type="button"
            onClick={() =>
              updateData({
                specializedStoreAccess: !data.specializedStoreAccess,
              })
            }
            className={`relative w-12 h-7 rounded-full transition-colors ${
              data.specializedStoreAccess ? "bg-emerald-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                data.specializedStoreAccess
                  ? "translate-x-5"
                  : "translate-x-0"
              }`}
            />
          </button>
          <span className="text-sm font-medium text-gray-700">
            Tengo acceso a tiendas naturistas o especializadas
          </span>
        </label>
      </div>
    </div>
  );
}
