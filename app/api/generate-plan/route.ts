import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generatePlan } from "@/lib/claude";
import { QuestionnaireData } from "@/types";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const userId = (session.user as { id: string }).id;
    const data: QuestionnaireData = await request.json();

    // Save the profile
    const profile = await prisma.profile.create({
      data: {
        userId,
        questionnaireData: data as object,
      },
    });

    // Generate plan with Claude
    const plan = await generatePlan(data);

    // Save the plan
    const savedPlan = await prisma.plan.create({
      data: {
        userId,
        profileId: profile.id,
        type: "complete",
        content: plan as object,
        summary: plan.profileSummary.substring(0, 200),
        caloriesTarget: plan.macros.calories,
        proteinTarget: plan.macros.protein,
        carbsTarget: plan.macros.carbs,
        fatsTarget: plan.macros.fats,
      },
    });

    return NextResponse.json({ planId: savedPlan.id, plan });
  } catch (error) {
    console.error("Error generating plan:", error);
    return NextResponse.json(
      { error: "Error al generar el plan" },
      { status: 500 }
    );
  }
}
