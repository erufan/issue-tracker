"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const status: { lable: string; value: Status | "All" }[] = [
  { lable: "all", value: "All" },
  { lable: "opne", value: "Open" },
  { lable: "In Progress", value: "IN_PROGRESS" },
  { lable: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();

  return (
    <Select.Root
      defaultValue={searchParams.get("status") || ""}
      onValueChange={(status) => {
        const params = new URLSearchParams();
        if (status !== "All") params.append("status", status);
        if (searchParams.get("orderBy"))
          params.append("orderBy", searchParams.get("orderBy")!);

        const query = params.size ? "?" + params.toString() : "";

        push(`/issues/list${query}`);
      }}
    >
      <Select.Trigger placeholder="filter by status" />
      <Select.Content>
        {status.map((status) => (
          <Select.Item key={status.lable} value={status.value}>
            {status.lable}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
