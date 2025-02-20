export type Balance = {
  pln: number;
  eur: number;
  usd: number;
};

export type User = {
  id: string;
  name: string;
  surname: string;
  balance: Balance;
};

export type Currencies = Extract<keyof Balance, string>;
