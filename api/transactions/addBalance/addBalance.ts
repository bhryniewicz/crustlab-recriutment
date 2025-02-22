import { Currency } from "@/types/users";
import { saveTransaction, users } from "../utils";
import { Transaction } from "@/types/transactions";
import { FEE } from "@/utils/constants";

export const addBalance = (
  userId: string,
  amount: number,
  currency: Currency
) => {
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
