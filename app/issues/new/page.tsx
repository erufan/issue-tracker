"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";

const newIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="title" />
      <TextArea placeholder="description..." />
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default newIssuePage;
