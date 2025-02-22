import { SubmitHandler } from "react-hook-form";
import { ComboboxSelect } from "../ComboboxSelect/ComboboxSelect";
import { currencies, mockUserSelection } from "@/data/users";
import { Form } from "../ui/form";
import { FormInput } from "../FormInput";
import { Button } from "../ui/button";
import { FormSchema, ChangeUsersBalanceFormValues } from "./schema";
import { FC } from "react";
import { useFormData as useForm } from "@/hooks/useForm";
import { useTransactionContext } from "@/contexts/transactionsContext";

interface ChangeUsersBalanceFormProps {
  onSubmit: SubmitHandler<ChangeUsersBalanceFormValues>;
  userId: string;
  setIsFormOpen: (value: boolean) => void;
}

export const ChangeUsersBalanceForm: FC<ChangeUsersBalanceFormProps> = ({
  onSubmit,
  userId,
  setIsFormOpen
}) => {
  const form = useForm<ChangeUsersBalanceFormValues>(FormSchema, setIsFormOpen);
  const { error } = useTransactionContext();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const usersWithoutSender = mockUserSelection.filter(
    (user) => user.value !== userId
  );

  const buttonText = isSubmitting ? "Sending" : "Send";

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {error && <h1 className="text-red-500 text-center text-sm">{error}</h1>}
        <FormInput name="amount" label="Amount" defaultValue={""} />
        <ComboboxSelect
          name="person"
          list={usersWithoutSender}
          label="Who get money?"
        />
        <ComboboxSelect name="currency" list={currencies} label="currency" />
        <Button type="submit" disabled={isSubmitting}>
          {buttonText}
        </Button>
      </form>
    </Form>
  );
};
