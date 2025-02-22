import { ChangeUsersBalanceForm } from "@/components/ChangeUsersBalanceForm";
import { Button } from "@/components/ui/button";
import { AdjustBalanceForm } from "@/components/AdjustBalanceForm";
import { ExchangeCurrenciesForm } from "../ExchangeCurrenciesForm";
import { FC, useState } from "react";
import { BadgeEuro, BadgeMinus, BadgePlus, ForwardIcon } from "lucide-react";
import { FormDialog } from "../FormDialog/FormDialog";
import { useSubmitters } from "@/hooks/useSubmitters";

interface ActionButtonsProps {
  userId: string;
}

export enum FormType {
  SEND_BALANCE = "SEND_BALANCE",
  ADD_BALANCE = "ADD_BALANCE",
  WITHDRAW_BALANCE = "WITHDRAW_BALANCE",
  EXCHANGE_CURRENCIES = "EXCHANGE_CURRENCIES",
}

export const ActionButtons: FC<ActionButtonsProps> = ({ userId }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState<FormType | null>(null);

  const {
    onSubmitAddBalance,
    onSubmitChangeUsersBalance,
    onSubmitExchange,
    onSubmitWidthdrawBalance,
  } = useSubmitters(userId);

  const getFormDetails = (type: FormType | null) => {
    switch (type) {
      case FormType.SEND_BALANCE:
        return {
          title: "Send balance to another user",
          subtitle: "Send some money to other people who are on the app",
          form: (
            <ChangeUsersBalanceForm
              onSubmit={onSubmitChangeUsersBalance}
              userId={userId}
              setIsFormOpen={setIsFormOpen}
            />
          ),
        };
      case FormType.ADD_BALANCE:
        return {
          title: "Add balance to your account",
          subtitle: "Add balance to your another bank account",
          form: (
            <AdjustBalanceForm
              onSubmit={onSubmitAddBalance}
              type="add"
              setIsFormOpen={setIsFormOpen}
            />
          ),
        };
      case FormType.WITHDRAW_BALANCE:
        return {
          title: "Withdraw balance from your account",
          subtitle: "Withdraw balance to your another bank account",
          form: (
            <AdjustBalanceForm
              onSubmit={onSubmitWidthdrawBalance}
              type="withdraw"
              setIsFormOpen={setIsFormOpen}
            />
          ),
        };
      case FormType.EXCHANGE_CURRENCIES:
        return {
          title: "Exchange currencies",
          subtitle: "Exchange your currencies with minimal fee",
          form: (
            <ExchangeCurrenciesForm
              onSubmit={onSubmitExchange}
              setIsFormOpen={setIsFormOpen}
            />
          ),
        };
      default:
        return null;
    }
  };

  const currentForm = getFormDetails(selectedForm);

  return (
    <>
      <div className="flex flex-col w-full md:max-w-min md:flex-row gap-2 md:gap-4">
        <Button
          onClick={() => {
            setIsFormOpen(true);
            setSelectedForm(FormType.SEND_BALANCE);
          }}
        >
          <ForwardIcon />
          Send balance to another user
        </Button>

        <Button
          onClick={() => {
            setIsFormOpen(true);
            setSelectedForm(FormType.ADD_BALANCE);
          }}
        >
          <BadgePlus />
          Add Balance
        </Button>

        <Button
          onClick={() => {
            setIsFormOpen(true);
            setSelectedForm(FormType.WITHDRAW_BALANCE);
          }}
        >
          <BadgeMinus />
          Withdraw Balance
        </Button>

        <Button
          onClick={() => {
            setIsFormOpen(true);
            setSelectedForm(FormType.EXCHANGE_CURRENCIES);
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
