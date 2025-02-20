import { z } from "zod";
import { currencySchema } from "../ExchangeForm/schema";

export const FormSchema = z.object({
  amount: z.coerce.number().gt(0),
  currency: currencySchema,
});

export type AdjustBalanceFormValues = z.infer<typeof FormSchema>;
