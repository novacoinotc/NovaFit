"use client";

import { QuestionnaireData } from "@/types";

interface StepProps {
  data: QuestionnaireData;
  updateData: (updates: Partial<QuestionnaireData>) => void;
}

type FrequencyValue = "never" | "sometimes" | "frequently" | "";

function FrequencySelector({
  label,
  value,
  onChange,
}: {
  label: string;
  value: FrequencyValue;
  onChange: (v: FrequencyValue) => void;
}) {
  const options: { value: FrequencyValue; label: string }[] = [
    { value: "never", label: "Nunca" },
    { value: "sometimes", label: "A veces" },
    { value: "frequently", label: "Frecuentemente" },
  ];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="flex gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`flex-1 rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
              value === opt.value
                ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ToggleSwitch({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer p-3 rounded-xl border border-gray-200 hover:border-gray-300 transition">
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative w-12 h-7 rounded-full transition-colors shrink-0 mt-0.5 ${
          checked ? "bg-emerald-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
      <div>
        <span className="block text-sm font-medium text-gray-700">
          {label}
        </span>
        {description && (
          <span className="block text-xs text-gray-500 mt-0.5">
            {description}
          </span>
        )}
      </div>
    </label>
  );
}

export default function StepEmotional({ data, updateData }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Contexto Emocional
        </h2>
        <p className="text-gray-500 mt-1">
          Entender tu relación con la comida nos ayuda a darte el mejor plan.
          Todo es confidencial.
        </p>
      </div>

      {/* Comer por estrés */}
      <FrequencySelector
        label="Como más cuando estoy estresado/a"
        value={data.stressEating}
        onChange={(v) => updateData({ stressEating: v })}
      />

      {/* Comer por aburrimiento */}
      <FrequencySelector
        label="Como por aburrimiento (sin hambre real)"
        value={data.boredomEating}
        onChange={(v) => updateData({ boredomEating: v })}
      />

      {/* Toggles */}
      <div className="space-y-3">
        <ToggleSwitch
          label="Siento culpa después de comer"
          description="Especialmente después de comidas grandes o 'no saludables'"
          checked={data.foodGuilt}
          onChange={(v) => updateData({ foodGuilt: v })}
        />

        <ToggleSwitch
          label="He tenido episodios de atracón"
          description="Comer grandes cantidades de comida sintiéndose fuera de control"
          checked={data.bingeEpisodes}
          onChange={(v) => updateData({ bingeEpisodes: v })}
        />

        <ToggleSwitch
          label="He sido diagnosticado/a con un trastorno alimentario"
          description="Anorexia, bulimia, trastorno por atracón, u otro"
          checked={data.eatingDisorderDiagnosis}
          onChange={(v) => updateData({ eatingDisorderDiagnosis: v })}
        />
      </div>

      {data.eatingDisorderDiagnosis && (
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
          <p className="text-sm text-amber-800">
            <strong>Nota importante:</strong> NovaFIT no reemplaza tratamiento
            profesional. Te recomendamos trabajar con un especialista en
            trastornos alimentarios junto con nuestro plan.
          </p>
        </div>
      )}

      {/* Motivación */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nivel de motivación actual:{" "}
          <span className="text-emerald-600 font-semibold">
            {data.motivationLevel}/10
          </span>
        </label>
        <input
          type="range"
          value={data.motivationLevel}
          onChange={(e) =>
            updateData({ motivationLevel: parseInt(e.target.value) })
          }
          min={1}
          max={10}
          step={1}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>Muy baja</span>
          <span>Muy alta</span>
        </div>
      </div>

      {/* Intentos anteriores */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Intentos previos de dieta
        </label>
        <textarea
          value={data.previousDietAttempts}
          onChange={(e) =>
            updateData({ previousDietAttempts: e.target.value })
          }
          placeholder="Ej: Hice keto 3 meses pero lo dejé, probé ayuno intermitente..."
          rows={2}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition resize-none"
        />
      </div>

      {/* Mayor obstáculo */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tu mayor obstáculo para llevar una dieta
        </label>
        <input
          type="text"
          value={data.biggestObstacle}
          onChange={(e) => updateData({ biggestObstacle: e.target.value })}
          placeholder="Ej: Falta de tiempo, antojos nocturnos, comidas sociales..."
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
        />
      </div>

      {/* Sistema de apoyo */}
      <ToggleSwitch
        label="Tengo apoyo de mi familia/pareja/amigos"
        description="Personas que me apoyarán en mis cambios de alimentación"
        checked={data.supportSystem}
        onChange={(v) => updateData({ supportSystem: v })}
      />
    </div>
  );
}
