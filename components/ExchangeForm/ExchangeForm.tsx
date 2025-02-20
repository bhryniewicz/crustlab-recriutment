import { FC } from "react";
import { ExchangeCurrenciesFormValues, FormSchema } from "./schema";
import { currencies } from "@/data/users";
import { GenericForm } from "../GenericForm";
import { SubmitHandler } from "react-hook-form";
import { Field } from "../GenericForm/types";

interface ExchangeFormProps {
  onSubmit: SubmitHandler<ExchangeCurrenciesFormValues>;
}

export const ExchangeForm: FC<ExchangeFormProps> = ({ onSubmit }) => {
  const fields: Field[] = [
    { name: "amount", label: "Amount", type: "input" },
    {
      name: "currency_send",
      label: "Currency to be exchanged",
      type: "select",
      options: currencies,
    },
    {
      name: "currency_received",
      label: "Currency to be received",
      type: "select",
      options: currencies,
    },
  ];

  return (
    <GenericForm
      onSubmit={onSubmit}
      fields={fields}
      schema={FormSchema}
      buttonText="Exchange"
    />
  );
};
