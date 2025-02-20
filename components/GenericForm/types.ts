import { Option } from "../ComboboxSelect/types";
import { AdjustBalanceFormValues } from "@/components/AdjustBalanceForm/schema";
import { ExchangeCurrenciesFormValues } from "@/components/ExchangeForm/schema";
import { ChangeUsersBalanceFormValues } from "@/components/ChangeUsersBalanceForm/schema";
import { SubmitHandler } from "react-hook-form";

export type FormValues =
  | AdjustBalanceFormValues
  | ExchangeCurrenciesFormValues
  | ChangeUsersBalanceFormValues;

export type FieldType = "input" | "select";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  options?: Option[];
};

export interface GenericFormProps<T extends FormValues> {
  onSubmit: SubmitHandler<T>;
  fields: Field[];
  schema: any;
  buttonText: string;
}
