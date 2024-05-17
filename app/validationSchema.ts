import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, "title required").max(255),
  description: z.string().min(1, "description required"),
});

export const patchIssueSchema = z.object({
  title: z.string().min(1, "title required").max(255).optional(),
  description: z.string().min(1, "description required").max(65555).optional(),
  assignedToUserId: z
    .string()
    .min(1, "assignedToUserId required")
    .max(255)
    .optional()
    .nullable(),
});
