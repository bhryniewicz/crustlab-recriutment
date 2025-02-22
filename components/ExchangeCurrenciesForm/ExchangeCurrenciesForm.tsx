import { SubmitHandler } from "react-hook-form";
import { Form } from "../ui/form";
import { FormInput } from "@/components/FormInput";
import { Button } from "../ui/button";
import { ComboboxSelect } from "../ComboboxSelect/ComboboxSelect";
import { currencies } from "@/data/users";
import { FC } from "react";
import { ExchangeCurrenciesFormValues, FormSchema } from "./schema";
import { useFormData as useForm } from "@/hooks/useForm";
import { useTransactionContext } from "@/contexts/transactionsContext";

interface ExchangeCurrenciesFormProps {
  onSubmit: SubmitHandler<ExchangeCurrenciesFormValues>;
  setIsFormOpen: (value: boolean) => void;
}

export const ExchangeCurrenciesForm: FC<ExchangeCurrenciesFormProps> = ({
  onSubmit,
  setIsFormOpen,
}) => {
  const form = useForm<ExchangeCurrenciesFormValues>(FormSchema, setIsFormOpen);

  const {
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = form;
  const { error } = useTransactionContext();

  const buttonText = isSubmitting ? "Exchanging" : "Exchange";

  const currencySend = watch("currency_send");
  const currencyReceived = watch("currency_received");

  const availableCurrenciesForSend = currencies.filter(
    (currency) => currency.value !== currencyReceived
  );

  const availableCurrenciesForReceive = currencies.filter(
    (currency) => currency.value !== currencySend
  );

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {error && <h1 className="text-red-500 text-center text-sm">{error}</h1>}
        <FormInput name="amount" label="Amount" defaultValue={""} />
        <ComboboxSelect
          name="currency_send"
          list={availableCurrenciesForSend}
          label="currency to be exchanged"
        />
        <ComboboxSelect
          name="currency_received"
          list={availableCurrenciesForReceive}
          label="currency to be received"
        />
        <Button type="submit" disabled={isSubmitting}>
          {buttonText}
        </Button>
      </form>
    </Form>
  );
};
