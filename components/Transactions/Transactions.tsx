import { Transaction } from "@/types/transactions";
import { TransactionCard } from "../TransactionCard";

export const Transactions = ({
  transactions,
}: {
  transactions: Transaction[] | null;
}) => {
  if (transactions === null || transactions.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No transactions for this account.
      </p>
    );
  }

  return (
    <div>
      <h3 className="font-bold text-xl mb-4">Transactions</h3>
      <div className="flex flex-col-reverse gap-4">
        {transactions.map((trans, idx) => (
          <TransactionCard transaction={trans} key={`${trans.type}-${idx}`} />
        ))}
      </div>
    </div>
  );
};
