import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  open: number;
  inprogress: number;
  closed: number;
}

const IssueSummary = ({ open, inprogress, closed }: Props) => {
  const containers: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    {
      label: "open Issues",
      value: open,
      status: "Open",
    },
    {
      label: "in-progress Issues",
      value: inprogress,
      status: "IN_PROGRESS",
    },
    {
      label: "closed Issues",
      value: closed,
      status: "CLOSED",
    },
  ];

  return (
    <Flex gap="5">
      {containers.map((container) => (
        <Card>
          <Flex direction="column" gap="1">
            <Link
              className="text-sm font-medium"
              href={`/issues/list?status=${container.status}`}
            >
              {container.label}
            </Link>
            <Text size="5" className="font-bold">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
