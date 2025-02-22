import { User } from "@/types/users";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";

export const UserCard = ({ user }: { user: User }) => {
  const {
    id,
    name,
    surname,
    balance: { pln, usd, eur },
  } = user;

  return (
    <Link href={`/users/${id}`}>
      <Card className="relative transition-all duration-300 ease-in-out shadow-md hover:shadow-xl">
        <CardContent className="px-8 py-6">
          <div className="grid grid-cols-1 gap-2 md:gap-0 md:grid-cols-2 items-center">
            <div className="space-y-2">
              <h2 className="text-[#9430f3] font-bold text-2xl">
                {name} {surname}
              </h2>
              <h4 className="text-gray-500 text-sm">{id}</h4>
            </div>
            <div className="flex gap-12 justify-start md:justify-end">
              <p>
                {pln.toFixed(2)} <span className="font-bold">PLN</span>
              </p>
              <p>
                {eur.toFixed(2)} <span className="font-bold">EUR</span>
              </p>
              <p>
                {usd.toFixed(2)} <span className="font-bold">USD</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
