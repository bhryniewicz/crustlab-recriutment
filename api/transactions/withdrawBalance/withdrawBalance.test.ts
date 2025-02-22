import { Currency } from "@/types/users";
import { withdrawBalance } from "./withdrawBalance";
import { saveTransaction, users } from "../utils";
import { FEE } from "@/utils/constants";

describe("withdrawBalance functionality", () => {
  it("should withdraw balance from account and deduct fee", () => {
    const senderId = "a1b2c3d4-e5f6-7890-1234-56789abcdef0";
    const amount = 10;
    const currency: Currency = "usd";

    const result = withdrawBalance(senderId, amount, currency);
    expect(result).toEqual({ success: true });
    expect(users[0].balance.usd).toBe(100 - (amount + amount * FEE));
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "usersData",
      JSON.stringify(users)
    );
    expect(saveTransaction).toHaveBeenCalled();
  });

  it("should return error if users are not found", () => {
    const senderId = "99";
    const amount = 10;
    const currency: Currency = "usd";

    const result = withdrawBalance(senderId, amount, currency);

    expect(result).toEqual({ success: false, error: "Users not found" });
    expect(localStorage.setItem).not.toHaveBeenCalledWith(
      "usersData",
      JSON.stringify(users)
    );
    expect(saveTransaction).not.toHaveBeenCalled();
  });
});
