import { z } from "zod";

export const FormSchema = z.object({
  amount: z.coerce.number().gt(0),
  currency_send: z.enum(["pln", "eur", "usd"] as const),
  currency_received: z.enum(["pln", "eur", "usd"] as const),
});

export type ExchangeCurrenciesFormValues = z.infer<typeof FormSchema>;
