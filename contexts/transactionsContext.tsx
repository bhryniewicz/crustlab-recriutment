import { Transaction } from "@/types/transactions";
import { getDataFromLocalStorage } from "@/utils/getDataFromLocalStorage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface TransactionsContextType {
  error: string;
  setError: (value: string) => void;
  transactions: Transaction[];
  isLoading: boolean;
  setTransactions: (value: Transaction[]) => void;
}

const TransactionContext = createContext<TransactionsContextType | null>(null);

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export const TransactionsProvider: React.FC<{
  id: string;
  children: ReactNode;
}> = ({ id, children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const transactions = getDataFromLocalStorage<Record<string, Transaction[]>>(
      "transactions",
      {}
    );

    const foundTransations = transactions[id] ?? [];

    if (foundTransations) {
      setTransactions(foundTransations);
    }

    setIsLoading(false);
  }, [id]);

  return (
    <TransactionContext.Provider
      value={{
        error,
        setError,
        transactions,
        isLoading,
        setTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
