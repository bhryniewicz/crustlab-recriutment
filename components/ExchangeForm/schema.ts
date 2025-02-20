import { z } from "zod";

export const currencySchema =  z.enum(["pln", "eur", "usd"] as const, {
    message: "Please select one of the currencies",
  })

export const FormSchema = z.object({
  amount: z.coerce.number().gt(0),
  currency_send: currencySchema,
  currency_received: currencySchema,
});

export type ExchangeCurrenciesFormValues = z.infer<typeof FormSchema>;
