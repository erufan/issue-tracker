import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";

export default async function Home() {
  const open = await prisma.issue.count({
    where: { status: "Open" },
  });

  const inprogress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });

  const closed = await prisma.issue.count({
    where: { status: "CLOSED" },
  });

  return <IssueSummary open={open} inprogress={inprogress} closed={closed} />;
}
