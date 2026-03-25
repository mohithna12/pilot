import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

async function getWorkspaceMembership(userId: string, workspaceId: string) {
  return db.workspaceMember.findUnique({
    where: { workspaceId_userId: { workspaceId, userId } },
  });
}

// GET /api/workspaces/[workspaceId]
export async function GET(
  _req: NextRequest,
  { params }: { params: { workspaceId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const membership = await getWorkspaceMembership(session.user.id, params.workspaceId);
  if (!membership) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const workspace = await db.workspace.findUnique({
    where: { id: params.workspaceId },
    include: {
      members: { include: { user: true } },
      milestones: { orderBy: { orderIndex: "asc" } },
      ideas: { orderBy: { createdAt: "desc" } },
      tasks: {
        orderBy: { orderIndex: "asc" },
        include: { assignee: true },
      },
    },
  });

  return NextResponse.json(workspace);
}

// PATCH /api/workspaces/[workspaceId]
export async function PATCH(
  req: NextRequest,
  { params }: { params: { workspaceId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const membership = await getWorkspaceMembership(session.user.id, params.workspaceId);
  if (!membership || membership.role !== "OWNER") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const { name, hackathonName, theme, startTime, endTime } = body;

  const workspace = await db.workspace.update({
    where: { id: params.workspaceId },
    data: {
      ...(name !== undefined && { name: name.trim() }),
      ...(hackathonName !== undefined && { hackathonName: hackathonName.trim() }),
      ...(theme !== undefined && { theme: theme?.trim() || null }),
      ...(startTime !== undefined && { startTime: new Date(startTime) }),
      ...(endTime !== undefined && { endTime: new Date(endTime) }),
    },
  });

  return NextResponse.json(workspace);
}

// DELETE /api/workspaces/[workspaceId]
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { workspaceId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const membership = await getWorkspaceMembership(session.user.id, params.workspaceId);
  if (!membership || membership.role !== "OWNER") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await db.workspace.delete({ where: { id: params.workspaceId } });

  return NextResponse.json({ success: true });
}
