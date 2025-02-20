"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useUsers } from "@/hooks/useUsers";
import { UserCard } from "@/components/UserCard";
import { useDebounce } from "use-debounce";

export const Users = () => {
  const [searchPhrase, setSearchPhrase] = useState<string>("");
  const [debouncedSearchPhrase] = useDebounce(searchPhrase, 500);
  const { users, isLoading } = useUsers(debouncedSearchPhrase);

  return (
    <div>
      <h3 className="font-bold text-3xl mb-4 text-[#123dff]">Our users</h3>
      <Input
        type="text"
        placeholder="Search by name or ID..."
        value={searchPhrase}
        onChange={(e) => setSearchPhrase(e.target.value)}
        className="mb-4"
      />

      {isLoading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {users.length > 0 ? (
            users.map((user) => <UserCard user={user} key={user.id} />)
          ) : (
            <p className="text-gray-500 col-span-2 text-center">
              No users found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
