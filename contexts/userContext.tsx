import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User } from "@/types/users";
import { Transaction } from "@/types/transactions";
import { getDataFromLocalStorage } from "@/utils/getDataFromLocalStorage";
import { mockUsers } from "@/data/users";

interface UserContextType {
  user: User | null;
  setUser: (value: User) => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export const UserProvider: React.FC<{ id: string; children: ReactNode }> = ({
  id,
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const users = getDataFromLocalStorage<User[]>("usersData", mockUsers);

    const foundUser = users.find((user) => user.id === id);

    if (foundUser) {
      setUser(foundUser);
    }

    setIsLoading(false);
  }, [id]);

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
