import { AdjustBalanceFormValues } from "@/components/AdjustBalanceForm/schema";
import { ChangeUsersBalanceFormValues } from "@/components/ChangeUsersBalanceForm/schema";
import { ExchangeCurrenciesFormValues } from "@/components/ExchangeCurrenciesForm/schema";
import { useTransactionContext } from "@/contexts/transactionsContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ZodSchema } from "zod";

type FormValues =
  | AdjustBalanceFormValues
  | ExchangeCurrenciesFormValues
  | ChangeUsersBalanceFormValues;

export const useFormData = <T extends FormValues>(
  formSchema: ZodSchema,
  setIsFormOpen: (value: boolean) => void
) => {
  const form = useForm<T>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
  });

  const { reset, formState } = form;
  const { isSubmitSuccessful } = formState;
  const { error } = useTransactionContext();

  useEffect(() => {
    if (isSubmitSuccessful && !error) {
      reset();
      setIsFormOpen(false);
    }
  }, [isSubmitSuccessful, error]);

  return form;
};
