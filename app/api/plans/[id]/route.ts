import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface RouteContext {
  params: { id: string };
}

export async function GET(request: Request, { params }: RouteContext) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const userId = (session.user as { id: string }).id;

    const plan = await prisma.plan.findUnique({
      where: { id: params.id },
    });

    if (!plan || plan.userId !== userId) {
      return NextResponse.json({ error: "Plan no encontrado" }, { status: 404 });
    }

    // Fetch the associated profile to get questionnaire data
    const profile = await prisma.profile.findUnique({
      where: { id: plan.profileId },
    });

    return NextResponse.json({
      id: plan.id,
      type: plan.type,
      content: plan.content,
      summary: plan.summary,
      caloriesTarget: plan.caloriesTarget,
      proteinTarget: plan.proteinTarget,
      carbsTarget: plan.carbsTarget,
      fatsTarget: plan.fatsTarget,
      profileId: plan.profileId,
      questionnaireData: profile?.questionnaireData ?? null,
      createdAt: plan.createdAt,
      updatedAt: plan.updatedAt,
    });
  } catch (error) {
    console.error("Error fetching plan:", error);
    return NextResponse.json(
      { error: "Error al obtener el plan" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: RouteContext) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const userId = (session.user as { id: string }).id;

    const plan = await prisma.plan.findUnique({
      where: { id: params.id },
    });

    if (!plan || plan.userId !== userId) {
      return NextResponse.json({ error: "Plan no encontrado" }, { status: 404 });
    }

    await prisma.plan.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting plan:", error);
    return NextResponse.json(
      { error: "Error al eliminar el plan" },
      { status: 500 }
    );
  }
}
