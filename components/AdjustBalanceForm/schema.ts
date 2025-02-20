import { z } from "zod";

export const FormSchema = z.object({
  amount: z.coerce.number().gt(0),
  currency: z.enum(["pln", "eur", "usd"] as const),
});

export type AdjustBalanceFormValues = z.infer<typeof FormSchema>;
