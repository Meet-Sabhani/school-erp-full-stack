import { z } from "zod";

export const schoolSchema = z.object({
  name: z.string().min(1),
  principalName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(10),
  address: z.string().min(1),
});

export type SchoolFormData = z.infer<typeof schoolSchema>;
