import { FC } from "react";
import { SubmitHandler } from "react-hook-form";
import { ChangeUsersBalanceFormValues } from "./schema";
import { currencies, mockUserSelection } from "@/data/users";
import { FormSchema } from "./schema";
import { GenericForm } from "../GenericForm";
import { Field } from "../GenericForm/types";

interface ChangeUsersBalanceFormProps {
  onSubmit: SubmitHandler<ChangeUsersBalanceFormValues>;
  userId: string;
}

export const ChangeUsersBalanceForm: FC<ChangeUsersBalanceFormProps> = ({
  onSubmit,
  userId,
}) => {
  const usersWithoutSender = mockUserSelection.filter(
    (user) => user.value !== userId
  );

  const fields: Field[] = [
    { name: "amount", label: "Amount", type: "input" },
    {
      name: "currency",
      label: "Currency",
      type: "select",
      options: currencies,
    },
    {
      name: "person",
      label: "Who gets the money?",
      type: "select",
      options: usersWithoutSender,
    },
  ];

  return (
    <GenericForm
      onSubmit={onSubmit}
      fields={fields}
      schema={FormSchema}
      buttonText="Send"
    />
  );
};
