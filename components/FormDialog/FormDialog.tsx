import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { CurrentForm } from "../ActionButtons";
import { FC } from "react";

interface FormDialogProps {
  isFormOpen: boolean;
  setIsFormOpen: (value: boolean) => void;
  currentForm: CurrentForm | null;
}

export const FormDialog: FC<FormDialogProps> = ({
  isFormOpen,
  setIsFormOpen,
  currentForm,
}) => {
  if (!currentForm) return;

  const { title, subtitle, form } = currentForm;

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <DialogContent className="w-[400px] p-12">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{subtitle}</DialogDescription>
        </DialogHeader>
        {form}
      </DialogContent>
    </Dialog>
  );
};
