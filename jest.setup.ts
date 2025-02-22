import "@testing-library/jest-dom";
import { users } from "./api/transactions/utils";
import { User } from "./types/users";

jest.mock("./api/transactions/utils.ts", () => ({
  ...jest.requireActual("./api/transactions/utils.ts"),
  saveTransaction: jest.fn(),
  users: [
    {
      id: "a1b2c3d4-e5f6-7890-1234-56789abcdef0",
      name: "John",
      surname: "Doe",
      balance: { usd: 100, eur: 110, pln: 343 },
    },
    {
      id: "b2c3d4e5-f678-9012-3456-789abcdef012",
      name: "Jane",
      surname: "Smith",
      balance: { usd: 50, eur: 110, pln: 343 },
    },
  ],
}));

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(Storage.prototype, "setItem");
  (users as User[]).splice(
    0,
    users.length,
    {
      id: "a1b2c3d4-e5f6-7890-1234-56789abcdef0",
      name: "John",
      surname: "Doe",
      balance: { usd: 100, eur: 110, pln: 343 },
    },
    {
      id: "b2c3d4e5-f678-9012-3456-789abcdef012",
      name: "Jane",
      surname: "Smith",
      balance: { usd: 50, eur: 110, pln: 343 },
    }
  );
});
