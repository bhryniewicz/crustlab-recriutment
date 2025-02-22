import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFormContext } from "react-hook-form";
import { FC } from "react";
import { ComboboxSelectProps } from "./types";

export const ComboboxSelect: FC<ComboboxSelectProps> = ({
  name,
  list,
  label,
}) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="capitalize">{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? list.find((item) => item.value === field.value)?.label
                    : `Select ${label}`}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 overflow-y-auto">
              <Command>
                <CommandList className="overflow-y-auto">
                  <CommandGroup className="overflow-y-auto">
                    {list.map(({ label, value }) => (
                      <CommandItem
                        value={label}
                        key={value}
                        onSelect={() => {
                          form.setValue(name, value);
                          form.trigger(name);
                        }}
                      >
                        {label}
                        <Check
                          className={cn(
                            "ml-auto",
                            value === field.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
