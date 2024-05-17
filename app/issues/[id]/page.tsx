import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { auth } from "@/auth";
import AssigneeSelect from "./AssigneeSelect";
import { Skeleton } from "@/app/components";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params: { id } }: Props) => {
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });
  const users = await prisma.user.findMany({ orderBy: { name: "asc" } });

  const session = await auth();

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        {session && (
          <Flex direction="column" gap="4">
            <AssigneeSelect users={users} issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        )}
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
