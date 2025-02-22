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

// Custom hook to get users with search
// export const useUsers = (searchPhrase: string) => {
//   // Check if we're on the client-side
//   const isClient = typeof window !== "undefined";

//   // Fetch users from localStorage (only on client)
//   const usersFromStorage = isClient
//     ? getDataFromLocalStorage<User[]>("usersData", mockUsers)
//     : [];

//   const { data = [], isLoading } = useQuery({
//     queryKey: ["users", searchPhrase],
//     queryFn: () => {
//       return usersFromStorage.filter(
//         ({ id, name }) =>
//           id.toLowerCase().includes(searchPhrase.toLowerCase()) ||
//           name.toLowerCase().includes(searchPhrase.toLowerCase())
//       );
//     },
//     initialData:
//       // Only pass initial data if searchPhrase is empty and data is available
//       searchPhrase === "" && isClient ? usersFromStorage : undefined,
//     enabled: isClient && searchPhrase !== "", // only enable when we're on the client and searchPhrase is not empty
//   });

//   return { data, isLoading };
// };
