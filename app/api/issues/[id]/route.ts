import { patchIssueSchema } from "@/app/validationSchema";
import { auth } from "@/auth";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Body {
  title: string;
  description: string;
  assignedToUserId: string;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) return NextResponse.json({}, { status: 401 });

  const body: Body = await request.json();

  const { assignedToUserId, description, title } = body;

  const validation = patchIssueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });

    if (!user)
      return NextResponse.json({ error: "invalid user id" }, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) return NextResponse.json("invalid issue id", { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: parseInt(params.id) },
    data: { title, description, assignedToUserId },
  });

  return NextResponse.json(updatedIssue);
}
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) return NextResponse.json({}, { status: 401 });

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) return NextResponse.json("invalid issue id");

  await prisma.issue.delete({ where: { id: parseInt(params.id) } });

  return NextResponse.json("deleted");
}
