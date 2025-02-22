import { ChangeUsersBalanceForm } from "@/components/ChangeUsersBalanceForm";
import { Button } from "@/components/ui/button";
import { AdjustBalanceForm } from "@/components/AdjustBalanceForm";
import { ExchangeCurrenciesForm } from "../ExchangeCurrenciesForm";
import { FC, ReactNode, useState } from "react";
import { BadgeEuro, BadgeMinus, BadgePlus, ForwardIcon } from "lucide-react";
import { FormDialog } from "../FormDialog/FormDialog";
import { useSubmitters } from "@/hooks/useSubmitters";

interface ActionButtonsProps {
  userId: string;
}

export type CurrentForm = {
  form: ReactNode;
  title: string;
  subtitle: string;
};

export const ActionButtons: FC<ActionButtonsProps> = ({ userId }) => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [currentForm, setCurrentForm] = useState<CurrentForm | null>(null);

  const {
    onSubmitAddBalance,
    onSubmitChangeUsersBalance,
    onSubmitExchange,
    onSubmitWidthdrawBalance,
  } = useSubmitters(userId);

  return (
    <>
      <div className="flex flex-col w-full md:max-w-min md:flex-row gap-2 md:gap-4 ">
        <Button
          onClick={() => {
            setIsFormOpen(true);
            setCurrentForm({
              title: "Send balance to another user",
              subtitle: "Send some money to other people who are on app",
              form: (
                <ChangeUsersBalanceForm
                  onSubmit={onSubmitChangeUsersBalance}
                  userId={userId}
                  setIsFormOpen={setIsFormOpen}
                />
              ),
            });
          }}
        >
          <ForwardIcon />
          Send balance to another user
        </Button>

        <Button
          onClick={() => {
            setIsFormOpen(true);
            setCurrentForm({
              title: "Add balance to your account",
              subtitle: "Add balance to your another bank account",
              form: (
                <AdjustBalanceForm
                  onSubmit={onSubmitAddBalance}
                  type="add"
                  setIsFormOpen={setIsFormOpen}
                />
              ),
            });
          }}
        >
          <BadgePlus />
          Add Balance
        </Button>

        <Button
          onClick={() => {
            setIsFormOpen(true);
            setCurrentForm({
              title: "Widthdraw balance from your account",
              subtitle: "Widthreaw balance to your another bank account",
              form: (
                <AdjustBalanceForm
                  onSubmit={onSubmitWidthdrawBalance}
                  type="withdraw"
                  setIsFormOpen={setIsFormOpen}
                />
              ),
            });
          }}
        >
          <BadgeMinus />
          Widthdraw Balance
        </Button>

        <Button
          onClick={() => {
            setIsFormOpen(true);
            setCurrentForm({
              title: "Exchange currencies",
              subtitle: "Exchange your currencies with minimal fee",
              form: (
                <ExchangeCurrenciesForm
                  onSubmit={onSubmitExchange}
                  setIsFormOpen={setIsFormOpen}
                />
              ),
            });
          }}
        >
          <BadgeEuro />
          Exchange currencies
        </Button>
      </div>
      <FormDialog
        isFormOpen={isFormOpen}
        setIsFormOpen={setIsFormOpen}
        currentForm={currentForm}
      />
    </>
  );
};
