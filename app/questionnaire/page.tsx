"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { QuestionnaireData, INITIAL_QUESTIONNAIRE_DATA } from "@/types";
import Link from "next/link";

import StepPersonalData from "@/components/questionnaire/StepPersonalData";
import StepBodyMetrics from "@/components/questionnaire/StepBodyMetrics";
import StepHealth from "@/components/questionnaire/StepHealth";
import StepGoal from "@/components/questionnaire/StepGoal";
import StepLifestyle from "@/components/questionnaire/StepLifestyle";
import StepFoodPreferences from "@/components/questionnaire/StepFoodPreferences";
import StepEmotional from "@/components/questionnaire/StepEmotional";
import StepCurrentExercise from "@/components/questionnaire/StepCurrentExercise";
import StepExercisePreferences from "@/components/questionnaire/StepExercisePreferences";
import StepExtras from "@/components/questionnaire/StepExtras";
import StepConfirmation from "@/components/questionnaire/StepConfirmation";

const STEP_TITLES = [
  "Datos Personales",
  "Metricas Corporales",
  "Salud",
  "Objetivo",
  "Estilo de Vida",
  "Alimentacion",
  "Emocional",
  "Ejercicio Actual",
  "Preferencias Ejercicio",
  "Extras",
  "Prioridades",
];

const TOTAL_STEPS = 11;

export default function QuestionnairePage() {
  const { status } = useSession();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<QuestionnaireData>(
    INITIAL_QUESTIONNAIRE_DATA
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const updateData = (updates: Partial<QuestionnaireData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    setIsGenerating(true);
    setError("");

    try {
      const res = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al generar el plan.");
        setIsGenerating(false);
        return;
      }

      router.push(`/plan/${data.planId}`);
    } catch {
      setError("Error de conexion. Intenta de nuevo.");
      setIsGenerating(false);
    }
  };

  const renderStep = () => {
    const props = { data: formData, updateData };
    switch (currentStep) {
      case 1:
        return <StepPersonalData {...props} />;
      case 2:
        return <StepBodyMetrics {...props} />;
      case 3:
        return <StepHealth {...props} />;
      case 4:
        return <StepGoal {...props} />;
      case 5:
        return <StepLifestyle {...props} />;
      case 6:
        return <StepFoodPreferences {...props} />;
      case 7:
        return <StepEmotional {...props} />;
      case 8:
        return <StepCurrentExercise {...props} />;
      case 9:
        return <StepExercisePreferences {...props} />;
      case 10:
        return <StepExtras {...props} />;
      case 11:
        return <StepConfirmation {...props} />;
      default:
        return null;
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Cargando...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  if (isGenerating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Generando tu plan personalizado
          </h2>
          <p className="text-gray-500 mb-4">
            Nuestra IA esta analizando tu perfil y creando un plan completo de
            nutricion y ejercicio. Esto puede tomar hasta un minuto.
          </p>
          <div className="flex items-center justify-center gap-1">
            <span className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:0ms]" />
            <span className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:150ms]" />
            <span className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:300ms]" />
          </div>
        </div>
      </div>
    );
  }

  const progress = (currentStep / TOTAL_STEPS) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-lg font-bold text-gray-900">
                Nova<span className="text-emerald-600">FIT</span>
              </span>
            </Link>
            <span className="text-sm text-gray-500">
              Paso {currentStep} de {TOTAL_STEPS}:{" "}
              <span className="font-medium text-gray-700">
                {STEP_TITLES[currentStep - 1]}
              </span>
            </span>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-emerald-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3 border border-red-100 mb-6">
              {error}
            </div>
          )}

          {renderStep()}
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
            Anterior
          </button>

          {currentStep < TOTAL_STEPS ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl shadow-sm hover:shadow-md transition active:scale-[0.98]"
            >
              Siguiente
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl shadow-sm hover:shadow-md transition active:scale-[0.98]"
            >
              Generar mi plan
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z"
                />
              </svg>
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
