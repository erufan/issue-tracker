"use client";
import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";

interface IssueForm {
  title: string;
  description: string;
}

const newIssuePage = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const { push } = useRouter();
  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/issues", data);
        push("/issues");
      })}
    >
      <TextField.Root placeholder="title" {...register("title")} />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="description..." {...field} />
        )}
      />

      <Button>Submit New Issue</Button>
    </form>
  );
};

export default newIssuePage;
