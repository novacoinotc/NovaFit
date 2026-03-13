"use client";

import { QuestionnaireData } from "@/types";

interface StepProps {
  data: QuestionnaireData;
  updateData: (updates: Partial<QuestionnaireData>) => void;
}

export default function StepLifestyle({ data, updateData }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">Estilo de Vida</h2>
        <p className="text-gray-500 mt-1 text-sm sm:text-base">
          Entender tu rutina diaria nos ayuda a adaptar el plan a tu vida real.
        </p>
      </div>

      {/* Tipo de trabajo */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tipo de trabajo
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              value: "sedentary" as const,
              label: "Sedentario",
              desc: "Escritorio/oficina",
            },
            {
              value: "moderate" as const,
              label: "Moderado",
              desc: "Caminata frecuente",
            },
            {
              value: "physical" as const,
              label: "Físico",
              desc: "Trabajo manual",
            },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => updateData({ workType: opt.value })}
              className={`rounded-xl border p-3 text-center transition min-h-[44px] ${
                data.workType === opt.value
                  ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/20"
                  : "border-gray-300 bg-white hover:border-gray-400"
              }`}
            >
              <span
                className={`block text-sm font-semibold ${
                  data.workType === opt.value
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

      {/* Horario de trabajo */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Horario de trabajo
        </label>
        <div className="flex flex-wrap gap-2">
          {[
            { value: "morning" as const, label: "Mañana" },
            { value: "afternoon" as const, label: "Tarde" },
            { value: "night" as const, label: "Noche" },
            { value: "rotating" as const, label: "Rotativo" },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => updateData({ workSchedule: opt.value })}
              className={`px-4 py-2.5 sm:py-2 rounded-full text-sm font-medium border transition min-h-[44px] sm:min-h-0 ${
                data.workSchedule === opt.value
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                  : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Horarios sueño */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hora de despertar
          </label>
          <input
            type="time"
            value={data.wakeUpTime}
            onChange={(e) => updateData({ wakeUpTime: e.target.value })}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hora de dormir
          </label>
          <input
            type="time"
            value={data.bedTime}
            onChange={(e) => updateData({ bedTime: e.target.value })}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
          />
        </div>
      </div>

      {/* Horas de sueño y calidad */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Horas de sueño promedio
          </label>
          <input
            type="number"
            value={data.averageSleepHours || ""}
            onChange={(e) =>
              updateData({
                averageSleepHours: parseFloat(e.target.value) || 0,
              })
            }
            min={3}
            max={14}
            step={0.5}
            placeholder="7"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Calidad de sueño
          </label>
          <div className="flex gap-2">
            {[
              { value: "good" as const, label: "Buena" },
              { value: "regular" as const, label: "Regular" },
              { value: "poor" as const, label: "Mala" },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => updateData({ sleepQuality: opt.value })}
                className={`flex-1 rounded-xl border px-3 py-2.5 text-sm font-medium transition min-h-[44px] ${
                  data.sleepQuality === opt.value
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

      {/* Nivel de estrés */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nivel de estrés:{" "}
          <span className="text-emerald-600 font-semibold">
            {data.stressLevel}/5
          </span>
        </label>
        <input
          type="range"
          value={data.stressLevel}
          onChange={(e) =>
            updateData({ stressLevel: parseInt(e.target.value) })
          }
          min={1}
          max={5}
          step={1}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>Muy bajo</span>
          <span>Muy alto</span>
        </div>
      </div>

      {/* Hogar, café, fumador */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Personas en casa
          </label>
          <input
            type="number"
            value={data.householdSize || ""}
            onChange={(e) =>
              updateData({ householdSize: parseInt(e.target.value) || 1 })
            }
            min={1}
            max={20}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tazas café/té al día
          </label>
          <input
            type="number"
            value={data.coffeeTeaCups}
            onChange={(e) =>
              updateData({ coffeeTeaCups: parseInt(e.target.value) || 0 })
            }
            min={0}
            max={20}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Litros de agua/día
          </label>
          <input
            type="number"
            value={data.dailyWaterLiters}
            onChange={(e) =>
              updateData({
                dailyWaterLiters: parseFloat(e.target.value) || 0,
              })
            }
            min={0}
            max={10}
            step={0.5}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
          />
        </div>
      </div>

      {/* Tabaco */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Consumo de tabaco
        </label>
        <div className="flex flex-wrap gap-2">
          {[
            { value: "no" as const, label: "No fumo" },
            { value: "occasional" as const, label: "Ocasional" },
            { value: "daily" as const, label: "Diario" },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => updateData({ smokingStatus: opt.value })}
              className={`px-4 py-2.5 sm:py-2 rounded-full text-sm font-medium border transition min-h-[44px] sm:min-h-0 ${
                data.smokingStatus === opt.value
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                  : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Horarios de comida */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Horarios habituales de comida
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Desayuno
            </label>
            <input
              type="time"
              value={data.mealTimes.breakfast}
              onChange={(e) =>
                updateData({
                  mealTimes: { ...data.mealTimes, breakfast: e.target.value },
                })
              }
              className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-gray-800 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Comida</label>
            <input
              type="time"
              value={data.mealTimes.lunch}
              onChange={(e) =>
                updateData({
                  mealTimes: { ...data.mealTimes, lunch: e.target.value },
                })
              }
              className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-gray-800 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Cena</label>
            <input
              type="time"
              value={data.mealTimes.dinner}
              onChange={(e) =>
                updateData({
                  mealTimes: { ...data.mealTimes, dinner: e.target.value },
                })
              }
              className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-gray-800 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
