"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const status: { lable: string; value?: Status | "All" }[] = [
  { lable: "all", value: "All" },
  { lable: "opne", value: "Open" },
  { lable: "In Progress", value: "IN_PROGRESS" },
  { lable: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  const { push, replace } = useRouter();

  return (
    <Select.Root
      onValueChange={(value) => {
        if (value === "All") return replace("/issues/list");
        push("?status=" + value);
      }}
    >
      <Select.Trigger placeholder="filter by status" />
      <Select.Content>
        {status.map((status) => (
          <Select.Item key={status.lable} value={status.value || "All"}>
            {status.lable}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
