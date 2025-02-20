import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "../FormInput";
import { ComboboxSelect } from "../ComboboxSelect/ComboboxSelect";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { FormValues, GenericFormProps } from "./types";

export const GenericForm = <T extends FormValues>({
  onSubmit,
  fields,
  schema,
  buttonText,
}: GenericFormProps<T>) => {
  const form = useForm<T>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const { handleSubmit, reset, formState } = form;
  const { isSubmitSuccessful } = formState;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {fields.map((field, index) => (
          <div key={index}>
            {field.type === "input" ? (
              <FormInput
                name={field.name}
                label={field.label}
                defaultValue={""}
              />
            ) : (
              <ComboboxSelect
                name={field.name}
                list={field.options || []}
                label={field.label}
              />
            )}
          </div>
        ))}
        <Button type="submit">{buttonText}</Button>
      </form>
    </Form>
  );
};
