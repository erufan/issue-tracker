import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const issuesSchema = z.object({
  title: z.string().min(1, "title required").max(255),
  description: z.string().min(1, "description required"),
});

interface Body {
  title: string;
  description: string;
}

export async function POST(request: NextRequest) {
  const body: Body = await request.json();

  const validation = issuesSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
