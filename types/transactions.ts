import { Currencies } from "./users";

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
  currency?: Currencies;
  exchange_rate?: number;
  sender?: string;
  currency_received?: Currencies;
  currency_send?: Currencies;
};
