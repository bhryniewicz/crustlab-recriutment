import { mockUsers } from "@/data/users";
import { Transaction } from "@/types/transactions";
import { Currency, User } from "@/types/users";
import { getDataFromLocalStorage } from "@/utils/getDataFromLocalStorage";
import { useEffect, useState } from "react";
import { FEE, exchangeRates } from "@/utils/constants";

const saveTransaction = (userId: string, transaction: Transaction) => {
  const transactions = JSON.parse(localStorage.getItem("transactions") || "{}");

  if (!transactions[userId]) {
    transactions[userId] = [];
  }

  transactions[userId].push(transaction);

  localStorage.setItem("transactions", JSON.stringify(transactions));
};

const transactionsFromLocalStorage = getDataFromLocalStorage<
  Record<string, Transaction[]>
>("transactions", {});

const users = getDataFromLocalStorage<User[]>("usersData", mockUsers);

export const useTransactions = (id: string) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const changeUsersBalance = (
    firstUserId: string,
    secondUserId: string,
    amount: number,
    currency: Currency
  ) => {
    const sender = users.find((user) => user.id === firstUserId)!;
    const receiver = users.find((user) => user.id === secondUserId)!;

    if (sender && receiver) {
      const senderFullname = `${sender.name} ${sender.surname}`;
      const receiverFullname = `${receiver.name} ${receiver.surname}`;

      sender.balance[currency] -= amount - amount * FEE;
      receiver.balance[currency] += amount;

      localStorage.setItem("usersData", JSON.stringify(users));

      const transaction: Transaction = {
        type: "Transfer",
        sender: senderFullname,
        receiver: receiverFullname,
        amount,
        currency,
        date: new Date(),
      };

      saveTransaction(firstUserId, transaction);

      return { success: true };
    } else {
      return { success: false, error: "Users not found" };
    }
  };

  const widthdrawBalance = (
    userId: string,
    amount: number,
    currency: Currency
  ) => {
    const receiver = users.find((user) => user.id === userId)!;

    if (receiver.balance[currency] < amount) {
      return { success: false, error: "Not enough money to withdraw" };
    }

    const receiverFullname = `${receiver.name} ${receiver.surname}`;

    receiver.balance[currency] -= amount - amount * FEE;
    localStorage.setItem("usersData", JSON.stringify(users));

    const transaction: Transaction = {
      type: "Withdraw Balance",
      receiver: receiverFullname,
      amount,
      currency,
      date: new Date(),
    };

    saveTransaction(userId, transaction);

    return { success: true };
  };

  const addBalance = (userId: string, amount: number, currency: Currency) => {
    const receiver = users.find((user) => user.id === userId);

    if (receiver) {
      const receiverFullname = `${receiver.name} ${receiver.surname}`;

      receiver.balance[currency] += amount - amount * FEE;
      localStorage.setItem("usersData", JSON.stringify(users));

      const transaction: Transaction = {
        type: "Add Balance",
        receiver: receiverFullname,
        amount,
        currency,
        date: new Date(),
      };

      saveTransaction(userId, transaction);
      return { success: true };
    } else {
      return { success: false, error: "Users not found" };
    }
  };

  const exchangeCurrencies = (
    userId: string,
    currencySend: Currency,
    currencyReceived: Currency,
    amount: number
  ) => {
    const receiver = users.find((user) => user.id === userId);

    if (receiver) {
      const receiverFullname = `${receiver.name} ${receiver.surname}`;
      const exchangeRate = exchangeRates[currencySend]?.[currencyReceived];

      console.log(exchangeRate, "rate");

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

  useEffect(() => {
    const usersTransactions = transactionsFromLocalStorage || {};
    setTransactions(usersTransactions[id] || []);
  }, [id]);

  return {
    transactions,
    addBalance,
    widthdrawBalance,
    exchangeCurrencies,
    changeUsersBalance,
  };
};
