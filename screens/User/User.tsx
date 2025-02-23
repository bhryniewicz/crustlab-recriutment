"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import { UserBalance } from "@/components/UserBalance";
import { Transactions } from "@/components/Transactions";
import { ActionButtons } from "@/components/ActionButtons";
import { UserProvider, useUserContext } from "@/contexts/userContext";
import { ArrowLeft } from "lucide-react";
import { TransactionsProvider } from "@/contexts/transactionsContext";

export const User = () => {
  const { id }: { id: string } = useParams();

  return (
    <TransactionsProvider id={id}>
      <UserProvider id={id}>
        <UserScreen id={id} />
      </UserProvider>
    </TransactionsProvider>
  );
};

const UserScreen = ({ id }: { id: string }) => {
  const { isLoading, user } = useUserContext();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        Loading users
      </div>
    );
  }

  if (!user) return notFound();

  const { name, surname, balance } = user;
  const fullName = `${name} ${surname}`;

  return (
    <div className="min-h-screen">
      <div className="flex flex-col md:justify-between items-start gap-4">
        <p
          onClick={() => router.back()}
          className="cursor-pointer flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Back to users
        </p>
        <h1 className="text-7xl text-[#123dff]">{fullName}</h1>
        <p className="text-sm text-gray-500">{id}</p>
        <ActionButtons userId={id} />
      </div>
      <div className="grid grid-cols-1 gap-12 mt-12 md:mt-16">
        <UserBalance balance={balance} />
        <Transactions />
      </div>
    </div>
  );
};
