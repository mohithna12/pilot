import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

// POST /api/workspaces/join — join a workspace via invite code
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { inviteCode } = await req.json();

  if (!inviteCode?.trim()) {
    return NextResponse.json({ error: "Invite code is required" }, { status: 400 });
  }

  const workspace = await db.workspace.findUnique({
    where: { inviteCode: inviteCode.trim() },
  });

  if (!workspace) {
    return NextResponse.json({ error: "Invalid invite code" }, { status: 404 });
  }

  const existing = await db.workspaceMember.findUnique({
    where: {
      workspaceId_userId: {
        workspaceId: workspace.id,
        userId: session.user.id,
      },
    },
  });

  if (existing) {
    return NextResponse.json(workspace);
  }

  await db.workspaceMember.create({
    data: {
      workspaceId: workspace.id,
      userId: session.user.id,
      role: "MEMBER",
      skills: [],
    },
  });

  return NextResponse.json(workspace, { status: 201 });
}
