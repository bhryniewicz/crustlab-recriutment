import { SubmitHandler } from "react-hook-form";
import { Form } from "../ui/form";
import { FormInput } from "@/components/FormInput";
import { Button } from "../ui/button";
import { ComboboxSelect } from "../ComboboxSelect/ComboboxSelect";
import { currencies } from "@/data/users";
import { FormSchema, AdjustBalanceFormValues } from "./schema";
import { FC } from "react";
import { useFormData as useForm } from "@/hooks/useForm";
import { useTransactionContext } from "@/contexts/transactionsContext";

interface AdjustBalanceFormProps {
  onSubmit: SubmitHandler<AdjustBalanceFormValues>;
  type: "add" | "withdraw";
}

export const AdjustBalanceForm: FC<AdjustBalanceFormProps> = ({
  onSubmit,
  type,
}) => {
  const form = useForm<AdjustBalanceFormValues>(FormSchema);

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;
  const { error } = useTransactionContext();

  const buttonText = isSubmitting
    ? type === "withdraw"
      ? "Withdrawing..."
      : "Adding..."
    : type === "withdraw"
    ? "Withdraw Balance"
    : "Add Balance";

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {error && <h1 className="text-red-500 text-center text-sm">{error}</h1>}
        <FormInput name="amount" label="Amount" defaultValue={""} />
        <ComboboxSelect name="currency" list={currencies} label="currency" />
        <Button type="submit" disabled={isSubmitting}>
          {buttonText}
        </Button>
      </form>
    </Form>
  );
};
