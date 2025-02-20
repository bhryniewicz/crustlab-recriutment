import { z } from "zod";

export const FormSchema = z.object({
  amount: z.coerce.number().gt(0),
  person: z.string(),
  currency: z.enum(["pln", "eur", "usd"] as const),
});

export type ChangeUsersBalanceFormValues = z.infer<typeof FormSchema>;
