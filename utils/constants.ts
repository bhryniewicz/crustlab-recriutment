import { ExchangeRates } from "@/types/users";

export const exchangeRates: ExchangeRates = {
  usd: { eur: 0.92, pln: 4.3 },
  eur: { usd: 1.09, pln: 4.7 },
  pln: { usd: 0.23, eur: 0.21 },
};

export const FEE = 0.001;
