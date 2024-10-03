import IssueSummary from "./IssueSummary";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import LatestIssues from "./LatestIssues";
import { Metadata } from "next";
import prisma from "@/prisma/client";

export const dynamic = "force-dynamic";

export default async function Home() {
  const open = await prisma.issue.count({
    where: { status: "Open" },
  });

  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });

  const closed = await prisma.issue.count({
    where: { status: "CLOSED" },
  });

  const issueProps = {
    open,
    inProgress,
    closed,
  };

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary {...issueProps} />
        <IssueChart {...issueProps} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "issue Tracker _ dashboard",
  description: "view a summary of project issues",
};
