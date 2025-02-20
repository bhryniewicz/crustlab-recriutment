import { useState, useEffect } from "react";
import { User } from "@/types/users";
import { mockUsers } from "@/data/users";
import { getDataFromLocalStorage } from "@/utils/getDataFromLocalStorage";

export const useUser = (id: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const users = getDataFromLocalStorage<User[]>("usersData", mockUsers);
    const foundUser = users.find((user) => user.id === id);

    if (foundUser) {
      setUser(foundUser);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [id]);

  return { user, isLoading };
};
