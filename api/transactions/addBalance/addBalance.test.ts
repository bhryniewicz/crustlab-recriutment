import { Currency } from "@/types/users";
import { addBalance } from "./addBalance";
import { users } from "../utils";
import { FEE } from "@/utils/constants";

describe("addBalance functionality", () => {
  it("should add balance to account and deduct fee", () => {
    const senderId = "a1b2c3d4-e5f6-7890-1234-56789abcdef0";
    const amount = 10;
    const currency: Currency = "usd";

    const result = addBalance(senderId, amount, currency);
    expect(result).toEqual({ success: true });
    expect(users[0].balance.usd).toBe(100 + (amount - amount * FEE));
  });

  it("should return error if users are not found", () => {
    const senderId = "99";
    const amount = 10;
    const currency: Currency = "usd";

    const result = addBalance(senderId, amount, currency);

    expect(result).toEqual({ success: false, error: "Users not found" });
  });
});
