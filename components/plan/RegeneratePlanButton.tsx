"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface RegeneratePlanButtonProps {
  planId: string;
}

export default function RegeneratePlanButton({ planId }: RegeneratePlanButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegenerate = async () => {
    if (loading) return;

    const confirmed = window.confirm(
      "Se generara un nuevo plan con los mismos datos de tu perfil. Esto puede tomar un momento. Continuar?"
    );
    if (!confirmed) return;

    setLoading(true);
    try {
      // First, fetch the current plan to get the profile data
      const planRes = await fetch(`/api/plans/${planId}`);
      if (!planRes.ok) throw new Error("No se pudo obtener el plan actual");
      const planData = await planRes.json();

      if (!planData.questionnaireData) {
        throw new Error("No se encontraron datos del perfil asociado");
      }

      // Generate a new plan with the same questionnaire data
      const genRes = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(planData.questionnaireData),
      });

      if (!genRes.ok) throw new Error("Error al generar el plan");
      const result = await genRes.json();

      router.push(`/plan/${result.planId}`);
      router.refresh();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Error al regenerar el plan. Intenta de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleRegenerate}
      disabled={loading}
      className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl hover:bg-emerald-100 hover:border-emerald-300 transition disabled:opacity-60 disabled:cursor-not-allowed print:hidden"
      title="Regenerar plan con los mismos datos"
    >
      {loading ? (
        <>
          <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
          Generando...
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" />
          </svg>
          Regenerar plan
        </>
      )}
    </button>
  );
}
