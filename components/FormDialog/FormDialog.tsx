import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { CurrentForm } from "../ActionButtons";
import { FC } from "react";
import { useTransactionContext } from "@/contexts/transactionsContext";

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
  const { setError } = useTransactionContext();

  if (!currentForm) return;

  const { title, subtitle, form } = currentForm;

  const handleDialogOpenChange = (open: boolean) => {
    setIsFormOpen(open);
    setError("");
  };

  return (
    <Dialog open={isFormOpen} onOpenChange={handleDialogOpenChange}>
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
