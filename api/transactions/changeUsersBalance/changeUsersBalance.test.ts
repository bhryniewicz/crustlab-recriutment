import { FEE } from "@/utils/constants";
import { changeUsersBalance } from "./changeUsersBalance";
import { saveTransaction, users } from "../utils";
import { Currency } from "@/types/users";

describe("changeUsersBalance functionality", () => {
  it("should transfer the amount and deduct fees", () => {
    const senderId = "a1b2c3d4-e5f6-7890-1234-56789abcdef0";
    const receiverId = "b2c3d4e5-f678-9012-3456-789abcdef012";
    const amount = 10;
    const currency: Currency = "usd";

    const result = changeUsersBalance(senderId, receiverId, amount, currency);

    expect(result).toEqual({ success: true });
    expect(users[0].balance.usd).toBe(100 - (amount + amount * FEE)); // Assuming 2% fee, adjust FEE value if necessary
    expect(users[1].balance.usd).toBe(50 + amount);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "usersData",
      JSON.stringify(users)
    );
    expect(saveTransaction).toHaveBeenCalled();
  });

  it("should fail if sender has insufficient balance", () => {
    const senderId = "a1b2c3d4-e5f6-7890-1234-56789abcdef0";
    const receiverId = "b2c3d4e5-f678-9012-3456-789abcdef012";
    const amount = 500;
    const currency: Currency = "usd";

    const result = changeUsersBalance(senderId, receiverId, amount, currency);

    expect(result).toEqual({
      success: false,
      error: "Not enough USDs to send to another user",
    });
    expect(users[0].balance.usd).toBe(100);
    expect(users[1].balance.usd).toBe(50);
    expect(saveTransaction).not.toHaveBeenCalled();
  });

  it("should return error if users are not found", () => {
    const senderId = "99";
    const receiverId = "b2c3d4e5-f678-9012-3456-789abcdef012";
    const amount = 10;
    const currency: Currency = "usd";

    const result = changeUsersBalance(senderId, receiverId, amount, currency);

    expect(result).toEqual({ success: false, error: "Users not found" });
    expect(users[0].balance.usd).toBe(100);
    expect(users[1].balance.usd).toBe(50);
    expect(saveTransaction).not.toHaveBeenCalled();
  });
});
