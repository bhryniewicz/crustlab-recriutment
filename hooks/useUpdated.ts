import { useState } from "react";
import { useTransactions } from "./useTransactions";
import { User } from "@/types/users";
import { Transaction } from "@/types/transactions";
import { AdjustBalanceFormValues } from "@/components/AdjustBalanceForm/schema";
import { ExchangeCurrenciesFormValues } from "@/components/ExchangeForm/schema";
import { ChangeUsersBalanceFormValues } from "@/components/ChangeUsersBalanceForm/schema";

export const useUpdated = (id: string) => {
  const [updatedUser, setUpdatedUser] = useState<User | null>(null);
  const [updatedTransactions, setUpdatedTransactions] = useState<Transaction[]>(
    []
  );
  const {
    changeUsersBalance,
    addBalance,
    widthdrawBalance,
    exchangeCurrencies,
  } = useTransactions(id);

  const handleBalanceOperation = <
    T extends { success: boolean; error?: string }
  >(
    transactionFunc: () => T
  ) => {
    const result = transactionFunc();

    if (result.success) {
      const updatedUsers = JSON.parse(
        localStorage.getItem("usersData") || "[]"
      );

      const updatedTransactions = JSON.parse(
        localStorage.getItem("transactions") || "{}"
      );

      const newUser = updatedUsers.find((user: User) => user.id === id);
      const newTransactions = updatedTransactions[id];

      if (newUser) {
        setUpdatedUser(newUser);
        setUpdatedTransactions(newTransactions);
      }
    } else {
      console.log(result.error);
    }
  };

  const onSubmitChangeUsersBalance = (data: ChangeUsersBalanceFormValues) =>
    handleBalanceOperation(() =>
      changeUsersBalance(id, data.person, data.amount, data.currency)
    );

  const onSubmitAddBalance = (data: AdjustBalanceFormValues) =>
    handleBalanceOperation(() => addBalance(id, data.amount, data.currency));

  const onSubmitWidthdrawBalance = (data: AdjustBalanceFormValues) =>
    handleBalanceOperation(() =>
      widthdrawBalance(id, data.amount, data.currency)
    );

  const onSubmitExchange = (data: ExchangeCurrenciesFormValues) =>
    handleBalanceOperation(() =>
      exchangeCurrencies(
        id,
        data.currency_send,
        data.currency_received,
        data.amount
      )
    );

  return {
    updatedUser,
    updatedTransactions,
    onSubmitAddBalance,
    onSubmitChangeUsersBalance,
    onSubmitExchange,
    onSubmitWidthdrawBalance,
  };
};
