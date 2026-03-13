"use client";

import { useState } from "react";
import { QuestionnaireData } from "@/types";

interface StepProps {
  data: QuestionnaireData;
  updateData: (updates: Partial<QuestionnaireData>) => void;
}

const MEDICAL_CONDITIONS = [
  "Diabetes tipo 1",
  "Diabetes tipo 2",
  "Resistencia a la insulina",
  "Hipotiroidismo",
  "Hipertiroidismo",
  "Hipertensión",
  "Colesterol alto",
  "Triglicéridos altos",
  "Síndrome de ovario poliquístico",
  "Anemia",
  "Hígado graso",
  "Enfermedad celíaca",
  "Artritis",
  "Asma",
  "Ninguna",
];

const ALLERGIES = [
  "Maní/cacahuate",
  "Frutos secos",
  "Mariscos",
  "Pescado",
  "Huevo",
  "Soya",
  "Trigo",
  "Leche de vaca",
  "Ajonjolí/sésamo",
  "Ninguna",
];

const INTOLERANCES = [
  "Lactosa",
  "Gluten",
  "Fructosa",
  "Histamina",
  "FODMAPs",
  "Cafeína",
  "Ninguna",
];

const DIGESTIVE_ISSUES = [
  "Estreñimiento",
  "Diarrea frecuente",
  "Hinchazón/gases",
  "Acidez/reflujo",
  "Síndrome de intestino irritable",
  "Náuseas frecuentes",
  "Ninguno",
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
    if (option === "Ninguna" || option === "Ninguno") {
      onChange(selected.includes(option) ? [] : [option]);
      return;
    }
    const withoutNone = selected.filter(
      (s) => s !== "Ninguna" && s !== "Ninguno"
    );
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
          className={`px-3 py-1.5 rounded-full text-sm font-medium border transition ${
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

export default function StepHealth({ data, updateData }: StepProps) {
  const [customAllergy, setCustomAllergy] = useState("");
  const [customIntolerance, setCustomIntolerance] = useState("");

  const addCustomAllergy = () => {
    const trimmed = customAllergy.trim();
    if (trimmed && !data.foodAllergies.includes(trimmed)) {
      updateData({
        foodAllergies: [
          ...data.foodAllergies.filter(
            (a) => a !== "Ninguna" && a !== "Ninguno"
          ),
          trimmed,
        ],
      });
      setCustomAllergy("");
    }
  };

  const addCustomIntolerance = () => {
    const trimmed = customIntolerance.trim();
    if (trimmed && !data.intolerances.includes(trimmed)) {
      updateData({
        intolerances: [
          ...data.intolerances.filter(
            (i) => i !== "Ninguna" && i !== "Ninguno"
          ),
          trimmed,
        ],
      });
      setCustomIntolerance("");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Salud y Condiciones Médicas
        </h2>
        <p className="text-gray-500 mt-1">
          Esta información es confidencial y nos ayuda a crear un plan seguro.
        </p>
      </div>

      {/* Condiciones médicas */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Condiciones médicas diagnosticadas
        </label>
        <ChipSelector
          options={MEDICAL_CONDITIONS}
          selected={data.medicalConditions}
          onChange={(values) => updateData({ medicalConditions: values })}
        />
      </div>

      {/* Alergias */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Alergias alimentarias
        </label>
        <ChipSelector
          options={ALLERGIES}
          selected={data.foodAllergies}
          onChange={(values) => updateData({ foodAllergies: values })}
        />
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            value={customAllergy}
            onChange={(e) => setCustomAllergy(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addCustomAllergy()}
            placeholder="Agregar otra alergia..."
            className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
          />
          <button
            type="button"
            onClick={addCustomAllergy}
            className="px-4 py-2 rounded-xl bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition"
          >
            Agregar
          </button>
        </div>
      </div>

      {/* Intolerancias */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Intolerancias alimentarias
        </label>
        <ChipSelector
          options={INTOLERANCES}
          selected={data.intolerances}
          onChange={(values) => updateData({ intolerances: values })}
        />
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            value={customIntolerance}
            onChange={(e) => setCustomIntolerance(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addCustomIntolerance()}
            placeholder="Agregar otra intolerancia..."
            className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
          />
          <button
            type="button"
            onClick={addCustomIntolerance}
            className="px-4 py-2 rounded-xl bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition"
          >
            Agregar
          </button>
        </div>
      </div>

      {/* Medicamentos */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Medicamentos actuales{" "}
          <span className="text-gray-400 font-normal">— opcional</span>
        </label>
        <textarea
          value={data.currentMedications}
          onChange={(e) => updateData({ currentMedications: e.target.value })}
          placeholder="Ej: Metformina 500mg, Levotiroxina 50mcg..."
          rows={2}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition resize-none"
        />
      </div>

      {/* Problemas digestivos */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Problemas digestivos
        </label>
        <ChipSelector
          options={DIGESTIVE_ISSUES}
          selected={data.digestiveIssues}
          onChange={(values) => updateData({ digestiveIssues: values })}
        />
      </div>

      {/* Limitaciones físicas */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Limitaciones físicas{" "}
          <span className="text-gray-400 font-normal">— opcional</span>
        </label>
        <input
          type="text"
          value={data.physicalLimitations}
          onChange={(e) => updateData({ physicalLimitations: e.target.value })}
          placeholder="Ej: Lesión en rodilla derecha, dolor lumbar crónico..."
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
        />
      </div>

      {/* Cirugías recientes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Cirugías recientes{" "}
          <span className="text-gray-400 font-normal">— opcional</span>
        </label>
        <input
          type="text"
          value={data.recentSurgeries}
          onChange={(e) => updateData({ recentSurgeries: e.target.value })}
          placeholder="Ej: Cirugía de vesícula hace 3 meses..."
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
        />
      </div>
    </div>
  );
}
