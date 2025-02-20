import { FC } from "react";
import { FormSchema, AdjustBalanceFormValues } from "./schema";
import { currencies } from "@/data/users";
import { GenericForm } from "../GenericForm";
import { SubmitHandler } from "react-hook-form";
import { Field } from "../GenericForm/types";

interface AdjustBalanceFormProps {
  onSubmit: SubmitHandler<AdjustBalanceFormValues>;
  type: "add" | "withdraw";
}

export const AdjustBalanceForm: FC<AdjustBalanceFormProps> = ({
  onSubmit,
  type,
}) => {
  const fields: Field[] = [
    { name: "amount", label: "Amount", type: "input" },
    {
      name: "currency",
      label: "Currency",
      type: "select",
      options: currencies,
    },
  ];

  const buttonText = type === "withdraw" ? "Withdraw Balance" : "Add Balance";

  return (
    <GenericForm
      onSubmit={onSubmit}
      fields={fields}
      schema={FormSchema}
      buttonText={buttonText}
    />
  );
};
