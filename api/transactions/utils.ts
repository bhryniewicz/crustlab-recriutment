import { mockUsers } from "@/data/users";
import { Transaction } from "@/types/transactions";
import { User } from "@/types/users";
import { getDataFromLocalStorage } from "@/utils/getDataFromLocalStorage";

export const saveTransaction = (userId: string, transaction: Transaction) => {
  const transactions = JSON.parse(localStorage.getItem("transactions") || "{}");

  if (!transactions[userId]) {
    transactions[userId] = [];
  }

  transactions[userId].push(transaction);

  localStorage.setItem("transactions", JSON.stringify(transactions));
};

export const users = getDataFromLocalStorage<User[]>("usersData", mockUsers);
