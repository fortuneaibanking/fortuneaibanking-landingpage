import { z } from "zod";

export const waitlistSchema = z.object({
  email: z.string().email("That email no correct o. Check am again."),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^(\+?234|0)[789]\d{9}$/.test(val.replace(/\s/g, "")),
      "Enter a valid Nigerian number, e.g. 08012345678"
    ),
  cohort_code: z.string().optional(),
  source: z.string().optional(),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;
