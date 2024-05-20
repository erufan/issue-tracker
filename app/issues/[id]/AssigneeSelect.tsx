"use client";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  users: User[];
  issue: Issue;
}

const AssigneeSelect = ({ users, issue }: Props) => {
  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || "unassign"}
        onValueChange={(userId) => {
          let sendedId;
          userId === "unassign" ? (sendedId = null) : (sendedId = userId);
          axios
            .patch("/api/issues/" + issue.id, {
              assignedToUserId: sendedId,
            })
            .catch(() => {
              toast.error("changes could not be saved");
            });
        }}
      >
        <Select.Trigger placeholder="assignee..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassign">unassign</Select.Item>
            {users.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssigneeSelect;
