import { Currency } from "@/types/users";
import { saveTransaction, users } from "../utils";
import { Transaction } from "@/types/transactions";
import { exchangeRates, FEE } from "@/utils/constants";

export const exchangeCurrencies = (
  userId: string,
  currencySend: Currency,
  currencyReceived: Currency,
  amount: number
) => {
  const receiver = users.find((user) => user.id === userId);

  if (receiver) {
    const receiverFullname = `${receiver.name} ${receiver.surname}`;

    if (receiver.balance[currencySend] < amount) {
      return {
        success: false,
        error: `Not enough ${currencySend.toUpperCase()}s to exchange to ${currencyReceived.toUpperCase()}s`,
      };
    }

    //@ts-ignore
    const exchangeRate = exchangeRates[currencySend]?.[currencyReceived];

    receiver.balance[currencySend] -= amount + amount * FEE;
    receiver.balance[currencyReceived] += amount * exchangeRate;

    localStorage.setItem("usersData", JSON.stringify(users));

    const transaction: Transaction = {
      type: "Currency exchange",
      receiver: receiverFullname,
      amount,
      exchange_rate: exchangeRate,
      currency_send: currencySend,
      currency_received: currencyReceived,
      date: new Date(),
    };

    saveTransaction(userId, transaction);
    return { success: true };
  } else {
    return { success: false, error: "Users not found" };
  }
};
