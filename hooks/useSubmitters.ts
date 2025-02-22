import { AdjustBalanceFormValues } from "@/components/AdjustBalanceForm/schema";
import { ExchangeCurrenciesFormValues } from "@/components/ExchangeCurrenciesForm/schema";
import { ChangeUsersBalanceFormValues } from "@/components/ChangeUsersBalanceForm/schema";
import { User } from "@/types/users";
import { useUserContext } from "@/contexts/userContext";
import { useTransactionContext } from "@/contexts/transactionsContext";
import {
  changeUsersBalance,
  addBalance,
  withdrawBalance,
  exchangeCurrencies,
} from "@/api/transactions";

export const useSubmitters = (id: string) => {
  const { setUser } = useUserContext();
  const { setError, setTransactions } = useTransactionContext();

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
        setUser(newUser);
        setTransactions(newTransactions);
        setError("");
      }
    } else {
      setError(result.error as string);
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
      withdrawBalance(id, data.amount, data.currency)
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
    onSubmitChangeUsersBalance,
    onSubmitAddBalance,
    onSubmitWidthdrawBalance,
    onSubmitExchange,
  };
};
