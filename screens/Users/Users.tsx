"use client";

import { useState } from "react";
import { useUsers } from "@/hooks/useUsers";
import { Input } from "@/components/ui/input";
import { UserCard } from "@/components/UserCard";
import { useDebounce } from "use-debounce";

export const Users = () => {
  const [searchPhrase, setSearchPhrase] = useState<string>("");
  const [debouncedSearch] = useDebounce(searchPhrase, 500);
  const { users, isLoading } = useUsers(debouncedSearch);

  return (
    <div className="flex flex-col gap-4 min-h-screen">
      <h3 className="font-bold text-3xl mb-4 text-[#9430f3]">Our Users</h3>
      <Input
        type="text"
        placeholder="Search by name or ID..."
        value={searchPhrase}
        onChange={(e) => setSearchPhrase(e.target.value)}
        className="mb-4 bg-white"
      />

      {isLoading ? (
        <p className="text-gray-500">Loading...</p>
      ) : users.length > 0 ? (
        users.map((user) => <UserCard user={user} key={user.id} />)
      ) : (
        <p className="text-gray-500 text-center">No users found.</p>
      )}
    </div>
  );
};
