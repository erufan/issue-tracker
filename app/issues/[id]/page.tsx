import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Card, Flex, Heading } from "@radix-ui/themes";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

const IssueDetails = async ({ params: { id } }: Props) => {
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });

  if (!issue) notFound();

  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap="3" my="2">
        <IssueStatusBadge status={issue.status} />
        <p>{issue.createdAt.toDateString()}</p>
      </Flex>
      <Card>
        <p>{issue.description}</p>
      </Card>
    </>
  );
};

export default IssueDetails;
