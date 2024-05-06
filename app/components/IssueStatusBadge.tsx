import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

const statusMap: Record<
  Status,
  { lable: string; color: "red" | "violet" | "green" }
> = {
  Open: { lable: "Open", color: "red" },
  IN_PROGRESS: { lable: "In Progress", color: "violet" },
  CLOSED: { lable: "closed", color: "green" },
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].lable}</Badge>
  );
};

export default IssueStatusBadge;
