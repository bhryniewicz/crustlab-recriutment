import { useState, useEffect } from "react";
import { User } from "@/types/users";
import { mockUsers } from "@/data/users";
import { getDataFromLocalStorage } from "@/utils/getDataFromLocalStorage";
import { useQuery } from "@tanstack/react-query";

export const useUsers = (searchPhrase: string) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      setIsLoading(true);
      const usersFromStorage = getDataFromLocalStorage<User[]>(
        "usersData",
        mockUsers
      );

      const filteredUsers = searchPhrase
        ? usersFromStorage.filter(
            ({ id, name }) =>
              id.toLowerCase().includes(searchPhrase.toLowerCase()) ||
              name.toLowerCase().includes(searchPhrase.toLowerCase())
          )
        : usersFromStorage;

      setUsers(filteredUsers);
      setIsLoading(false);
    }
  }, [searchPhrase, isClient]);

  return { users, isLoading };
};

