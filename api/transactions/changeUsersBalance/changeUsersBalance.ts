import { Transaction } from "@/types/transactions";
import { Currency } from "@/types/users";
import { saveTransaction, users } from "../utils";
import { FEE } from "@/utils/constants";

export const changeUsersBalance = (
  senderId: string,
  receiverId: string,
  amount: number,
  currency: Currency
) => {
  const sender = users.find((user) => user.id === senderId)!;
  const receiver = users.find((user) => user.id === receiverId)!;

  if (sender && receiver) {
    const senderFullname = `${sender.name} ${sender.surname}`;
    const receiverFullname = `${receiver.name} ${receiver.surname}`;

    if (sender.balance[currency] < amount) {
      return {
        success: false,
        error: `Not enough ${currency.toUpperCase()}s to send to another user`,
      };
    }

    sender.balance[currency] -= amount + amount * FEE;
    receiver.balance[currency] += amount;

    localStorage.setItem("usersData", JSON.stringify(users));

    const senderTransaction: Transaction = {
      type: "Transfer",
      sender: senderFullname,
      receiver: receiverFullname,
      amount: -amount,
      currency,
      date: new Date(),
    };

    const receiverTransaction: Transaction = {
      type: "Transfer",
      sender: receiverFullname,
      receiver: senderFullname,
      amount,
      currency,
      date: new Date(),
    };

    saveTransaction(senderId, senderTransaction);
    saveTransaction(receiverId, receiverTransaction);

    return { success: true };
  } else {
    return { success: false, error: "Users not found" };
  }
};
