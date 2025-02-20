import { Currency } from "./users";

export type TransactionType =
  | "Transfer"
  | "Withdraw Balance"
  | "Add Balance"
  | "Currency exchange";

export type Transaction = {
  type: TransactionType;
  amount: number;
  date: Date;
  receiver: string;
  currency?: Currency;
  exchange_rate?: number;
  sender?: string;
  currency_received?: Currency;
  currency_send?: Currency;
};
