import { ChangeUsersBalanceForm } from "@/components/ChangeUsersBalanceForm";

import { Button } from "@/components/ui/button";
import { AdjustBalanceForm } from "@/components/AdjustBalanceForm";
import { ExchangeForm } from "../ExchangeForm";
import { FC, ReactNode, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { ChangeUsersBalanceFormValues } from "../ChangeUsersBalanceForm/schema";
import { AdjustBalanceFormValues } from "../AdjustBalanceForm/schema";
import { ExchangeCurrenciesFormValues } from "../ExchangeForm/schema";
import { BadgeEuro, BadgeMinus, BadgePlus, ForwardIcon } from "lucide-react";
import { FormDialog } from "../FormDialog/FormDialog";

interface ActionButtonsProps {
  onSubmitUpdateUserBalance: SubmitHandler<ChangeUsersBalanceFormValues>;
  onSubmitAddBalance: SubmitHandler<AdjustBalanceFormValues>;
  onSubmitWidthdrawBalance: SubmitHandler<AdjustBalanceFormValues>;
  onSubmitExchange: SubmitHandler<ExchangeCurrenciesFormValues>;
  userId: string;
}

export type CurrentForm = {
  form: ReactNode;
  title: string;
  subtitle: string;
};

export const ActionButtons: FC<ActionButtonsProps> = ({
  onSubmitUpdateUserBalance,
  onSubmitAddBalance,
  onSubmitWidthdrawBalance,
  onSubmitExchange,
  userId,
}) => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [currentForm, setCurrentForm] = useState<CurrentForm | null>(null);

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
                  onSubmit={onSubmitUpdateUserBalance}
                  userId={userId}
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
                <AdjustBalanceForm onSubmit={onSubmitAddBalance} type="add" />
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
              form: <ExchangeForm onSubmit={onSubmitExchange} />,
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
