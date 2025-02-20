import { z } from "zod";
import { currencySchema } from "../ExchangeForm/schema";

export const FormSchema = z.object({
  amount: z.coerce.number().gt(0),
  person: z.string({ message: "Please select one of them" }),
  currency: currencySchema,
});

export type ChangeUsersBalanceFormValues = z.infer<typeof FormSchema>;
