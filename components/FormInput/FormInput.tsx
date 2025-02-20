import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { FC } from "react";

interface FormInputProps {
  name: string;
  label: string;
  defaultValue?: number | string;
  type?: "number" | "text";
}
export const FormInput: FC<FormInputProps> = ({
  name,
  label,
  defaultValue,
  type = "number",
}) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={"Write some amount"} {...field} type={type} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
