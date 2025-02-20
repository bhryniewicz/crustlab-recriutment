export type Balance = {
  pln: number;
  eur: number;
  usd: number;
};

export type ExchangeRates = {
  [key in keyof Balance]: {
    [currency in Exclude<keyof Balance, key>]: number;
  };
};

export type User = {
  id: string;
  name: string;
  surname: string;
  balance: Balance;
};

export type Currency = Extract<keyof Balance, string>;
