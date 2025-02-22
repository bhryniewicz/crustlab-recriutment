import { TransactionCard } from "../TransactionCard";
import { useTransactionContext } from "@/contexts/transactionsContext";

export const Transactions = () => {
  const { transactions } = useTransactionContext();

  return (
    <div>
      <h3 className="font-bold text-xl mb-4">Transactions</h3>

      {transactions.length === 0 ? (
        <p className="text-gray-500">No transactions for this account.</p>
      ) : (
        <div className="flex flex-col-reverse gap-4">
          {transactions.map((trans, idx) => (
            <TransactionCard transaction={trans} key={`${trans.type}-${idx}`} />
          ))}
        </div>
      )}
    </div>
  );
};
