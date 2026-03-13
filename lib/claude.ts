import Anthropic from "@anthropic-ai/sdk";
import { QuestionnaireData, NutritionPlan } from "@/types";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

function buildPrompt(data: QuestionnaireData): string {
  return `Eres un nutriólogo y entrenador personal experto con 20 años de experiencia. Genera un plan COMPLETO y 100% personalizado basado en el siguiente perfil detallado del paciente.

IMPORTANTE: Responde ÚNICAMENTE con un JSON válido, sin texto adicional, sin markdown, sin backticks. El JSON debe seguir exactamente la estructura indicada al final.

=== PERFIL DEL PACIENTE ===

DATOS PERSONALES:
- Nombre: ${data.name}
- Edad: ${data.age} años
- Sexo biológico: ${data.biologicalSex === "male" ? "Masculino" : "Femenino"}
- Altura: ${data.height} cm
- Peso actual: ${data.currentWeight} kg
${data.goalWeight ? `- Peso meta: ${data.goalWeight} kg` : ""}
- País/región: ${data.country}

MÉTRICAS CORPORALES:
${data.bodyFatPercentage ? `- Grasa corporal: ${data.bodyFatPercentage}%` : ""}
${data.waistMeasurement ? `- Cintura: ${data.waistMeasurement} cm` : ""}
${data.hipMeasurement ? `- Cadera: ${data.hipMeasurement} cm` : ""}
${data.bodyType ? `- Tipo de cuerpo: ${data.bodyType}` : ""}
${data.weightOneYearAgo ? `- Peso hace 1 año: ${data.weightOneYearAgo} kg` : ""}
${data.weightFiveYearsAgo ? `- Peso hace 5 años: ${data.weightFiveYearsAgo} kg` : ""}

SALUD:
- Condiciones médicas: ${data.medicalConditions.length > 0 ? data.medicalConditions.join(", ") : "Ninguna"}
- Alergias: ${data.foodAllergies.length > 0 ? data.foodAllergies.join(", ") : "Ninguna"}
- Intolerancias: ${data.intolerances.length > 0 ? data.intolerances.join(", ") : "Ninguna"}
- Medicamentos: ${data.currentMedications || "Ninguno"}
- Problemas digestivos: ${data.digestiveIssues.length > 0 ? data.digestiveIssues.join(", ") : "Ninguno"}
- Limitaciones físicas: ${data.physicalLimitations || "Ninguna"}

OBJETIVO:
- Objetivo principal: ${data.mainGoal}
- Línea de tiempo: ${data.desiredTimeline || "No especificada"}
${data.specificEvent ? `- Evento específico: ${data.specificEvent}` : ""}

ESTILO DE VIDA:
- Tipo de trabajo: ${data.workType}
- Horario laboral: ${data.workSchedule}
- Despertar: ${data.wakeUpTime} | Dormir: ${data.bedTime}
- Horas de sueño: ${data.averageSleepHours} | Calidad: ${data.sleepQuality}
- Nivel de estrés: ${data.stressLevel}/5
- Personas en hogar: ${data.householdSize}
- Café/té: ${data.coffeeTeaCups} tazas/día
- Tabaco: ${data.smokingStatus}
- Agua: ${data.dailyWaterLiters} L/día
- Horarios comidas: Desayuno ${data.mealTimes.breakfast}, Comida ${data.mealTimes.lunch}, Cena ${data.mealTimes.dinner}

PREFERENCIAS ALIMENTICIAS:
- Tipo de dieta: ${data.dietType}
- Comidas favoritas: ${data.lovedFoods.length > 0 ? data.lovedFoods.join(", ") : "No especificadas"}
- Comidas que evita: ${data.hatedFoods.length > 0 ? data.hatedFoods.join(", ") : "No especificadas"}
- Habilidad cocina: ${data.cookingSkill}/5
- Tiempo para cocinar: ${data.cookingTimeMinutes} min/día
- Presupuesto: ${data.foodBudget}
- Comidas al día: ${data.mealsPerDay}
- Come fuera: ${data.eatingOut}
- Alcohol: ${data.alcoholConsumption}
- Picoteo: ${data.snacking}
${data.snackTypes ? `- Tipo de snacks: ${data.snackTypes}` : ""}
${data.currentSupplements ? `- Suplementos: ${data.currentSupplements}` : ""}

CONTEXTO EMOCIONAL:
- Come por estrés: ${data.stressEating}
- Come por aburrimiento: ${data.boredomEating}
- Culpa alimentaria: ${data.foodGuilt ? "Sí" : "No"}
- Motivación: ${data.motivationLevel}/10
${data.biggestObstacle ? `- Mayor obstáculo: ${data.biggestObstacle}` : ""}
- Sistema de apoyo: ${data.supportSystem ? "Sí" : "No"}

EJERCICIO ACTUAL:
- Hace ejercicio: ${data.currentlyExercising ? "Sí" : "No"}
${data.currentExerciseType ? `- Tipo: ${data.currentExerciseType}` : ""}
- Frecuencia: ${data.weeklyFrequency} veces/semana
- Duración: ${data.sessionDuration} min
- Experiencia: ${data.exerciseExperience}

PREFERENCIAS DE EJERCICIO:
- Lugar: ${data.trainingLocation}
- Equipo disponible: ${data.homeEquipment.length > 0 ? data.homeEquipment.join(", ") : "Ninguno"}
- Tiempo disponible: ${data.exerciseTimeMinutes} min
- Días disponibles: ${data.availableDaysPerWeek}
- Horario preferido: ${data.preferredTrainingTime}
${data.enjoyedExercises ? `- Ejercicios que disfruta: ${data.enjoyedExercises}` : ""}
${data.dislikedExercises ? `- Ejercicios que evita: ${data.dislikedExercises}` : ""}
- Intereses: ${data.exerciseInterest.length > 0 ? data.exerciseInterest.join(", ") : "Combinación general"}

EXTRAS:
- Nivel de estrictez deseado: ${data.planStrictness}
- Preferencia variedad: ${data.varietyPreference}
- Necesita meal prep: ${data.needsMealPrep ? "Sí" : "No"}
${data.additionalNotes ? `- Notas adicionales: ${data.additionalNotes}` : ""}

PRIORIDADES (en orden de importancia):
${data.priorities.map((p, i) => `${i + 1}. ${p}`).join("\n")}

=== ESTRUCTURA JSON REQUERIDA ===
{
  "profileSummary": "Análisis detallado de la situación del paciente (2-3 párrafos)",
  "macros": {
    "calories": number,
    "protein": number (gramos),
    "carbs": number (gramos),
    "fats": number (gramos)
  },
  "weeklyMealPlan": [
    {
      "day": "Lunes",
      "meals": [
        {
          "name": "Desayuno",
          "time": "08:00",
          "foods": [
            {
              "name": "nombre del alimento",
              "quantity": "cantidad con unidad",
              "calories": number,
              "protein": number,
              "carbs": number,
              "fats": number,
              "recipe": "instrucciones breves de preparación (opcional)"
            }
          ],
          "totalCalories": number
        }
      ]
    }
  ],
  "shoppingList": [
    {
      "category": "Proteínas",
      "items": [{ "name": "Pechuga de pollo", "quantity": "1 kg" }]
    }
  ],
  "exercisePlan": [
    {
      "day": "Lunes",
      "focus": "Tren superior",
      "exercises": [
        {
          "name": "Press de banca",
          "sets": 3,
          "reps": "10-12",
          "rest": "60 seg",
          "notes": "nota opcional"
        }
      ],
      "duration": 45,
      "notes": "nota general del día"
    }
  ],
  "tips": ["consejo 1", "consejo 2"],
  "substitutions": ["sustitución 1", "sustitución 2"]
}

Genera el plan completo para los 7 días de la semana. Incluye al menos ${data.mealsPerDay} comidas por día. Adapta los alimentos al país/región del paciente (${data.country}). Los ejercicios deben ser apropiados para el nivel ${data.exerciseExperience || "principiante"} y el equipamiento disponible.`;
}

export async function generatePlan(data: QuestionnaireData): Promise<NutritionPlan> {
  const prompt = buildPrompt(data);

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 16000,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const textContent = message.content.find((c) => c.type === "text");
  if (!textContent || textContent.type !== "text") {
    throw new Error("No se recibió respuesta de texto de Claude");
  }

  let jsonText = textContent.text.trim();
  // Remove markdown code block if present
  if (jsonText.startsWith("```")) {
    jsonText = jsonText.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }

  // If the response was truncated (stop_reason: max_tokens), try to repair the JSON
  if (message.stop_reason === "end_turn") {
    const plan: NutritionPlan = JSON.parse(jsonText);
    return plan;
  }

  // Truncated response - attempt to close open JSON structures
  console.warn("Response was truncated, attempting JSON repair...");
  jsonText = repairTruncatedJson(jsonText);
  const plan: NutritionPlan = JSON.parse(jsonText);
  return plan;
}

function repairTruncatedJson(json: string): string {
  // Remove any trailing incomplete string
  let text = json.replace(/,\s*"[^"]*$/, "");
  // Remove trailing comma
  text = text.replace(/,\s*$/, "");

  // Count open brackets/braces
  let openBraces = 0;
  let openBrackets = 0;
  let inString = false;
  let escape = false;

  for (const char of text) {
    if (escape) { escape = false; continue; }
    if (char === "\\") { escape = true; continue; }
    if (char === '"') { inString = !inString; continue; }
    if (inString) continue;
    if (char === "{") openBraces++;
    if (char === "}") openBraces--;
    if (char === "[") openBrackets++;
    if (char === "]") openBrackets--;
  }

  // Close any open strings
  if (inString) text += '"';

  // Close open brackets and braces
  for (let i = 0; i < openBrackets; i++) text += "]";
  for (let i = 0; i < openBraces; i++) text += "}";

  return text;
}
