import { Currency } from "@/types/users";
import { saveTransaction, users } from "../utils";
import { exchangeCurrencies } from "./exchangeCurrencies";
import { FEE } from "@/utils/constants";

describe("exchangeCurrencies", () => {
  it("should successfully exchange currencies", () => {
    const userId = "a1b2c3d4-e5f6-7890-1234-56789abcdef0";
    const currencySend: Currency = "usd";
    const currencyReceived: Currency = "eur";
    const amount = 10;

    const result = exchangeCurrencies(
      userId,
      currencySend,
      currencyReceived,
      amount
    );

    expect(result).toEqual({ success: true });
    expect(users[0].balance.usd).toBe(100 - (amount + amount * FEE));
    expect(users[0].balance.eur).toBe(110 + amount * 0.92);
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(saveTransaction).toHaveBeenCalled();
  });

  it("should fail if user does not exist", () => {
    const result = exchangeCurrencies("invalid-user", "usd", "eur", 10);

    expect(result).toEqual({ success: false, error: "Users not found" });
    expect(localStorage.setItem).not.toHaveBeenCalled();
    expect(saveTransaction).not.toHaveBeenCalled();
  });

  it("should fail if user has insufficient balance", () => {
    const result = exchangeCurrencies(
      "a1b2c3d4-e5f6-7890-1234-56789abcdef0",
      "usd",
      "eur",
      500
    );

    expect(result).toEqual({
      success: false,
      error: "Not enough USDs to exchange to EURs",
    });
    expect(users[0].balance.usd).toBe(100);
    expect(localStorage.setItem).not.toHaveBeenCalled();
    expect(saveTransaction).not.toHaveBeenCalled();
  });
});
