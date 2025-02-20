"use client";

import { notFound, useParams } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { useTransactions } from "@/hooks/useTransactions";
import { UserBalance } from "@/components/UserBalance";
import { Transactions } from "@/components/Transactions";
import { ActionButtons } from "@/components/ActionButtons";
import { useUpdated } from "@/hooks/useUpdated";

export const User = () => {
  const { id }: { id: string } = useParams();
  const { user, isLoading } = useUser(id);
  const { transactions } = useTransactions(id);

  const {
    updatedTransactions,
    updatedUser,
    onSubmitAddBalance,
    onSubmitChangeUsersBalance,
    onSubmitExchange,
    onSubmitWidthdrawBalance,
  } = useUpdated(id);

  if (isLoading)
    return (
      <div className="space-y-4">
        <div className="w-72 h-8 bg-gray-300 animate-pulse rounded"></div>
        <div className="w-40 h-6 bg-gray-200 animate-pulse rounded"></div>
        <div className="w-96 h-6 bg-gray-300 animate-pulse rounded"></div>
        <div className="w-full h-48 bg-gray-200 animate-pulse rounded"></div>
      </div>
    );

  if (!user) return notFound();

  const { name, surname, balance } = updatedUser ?? user;

  const fullName = `${name} ${surname}`;

  return (
    <div className="max-h-screen">
      <div className="flex flex-col md:flex-row md:justify-between items-start">
        <div>
          <h1 className="text-7xl text-[#123dff] mb-2 md:mb-4">{fullName}</h1>
          <p className="text-sm text-gray-500">{id}</p>
        </div>
        <ActionButtons
          onSubmitUpdateUserBalance={onSubmitChangeUsersBalance}
          onSubmitWidthdrawBalance={onSubmitWidthdrawBalance}
          onSubmitAddBalance={onSubmitAddBalance}
          onSubmitExchange={onSubmitExchange}
          userId={id}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 md:mt-16">
        <UserBalance balance={balance} />
        <Transactions
          transactions={
            updatedTransactions.length === 0
              ? transactions
              : updatedTransactions
          }
        />
      </div>
    </div>
  );
};
