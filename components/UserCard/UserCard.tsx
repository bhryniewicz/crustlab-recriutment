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
          <ul className="space-y-2">
            <li>
              <strong>Id:</strong> {id}
            </li>
            <li>
              <strong>Name:</strong> {name}
            </li>
            <li>
              <strong>Surname:</strong> {surname}
            </li>
            <li>
              <strong>Current balance:</strong> {pln.toFixed(2)} PLN,{" "}
              {eur.toFixed(2)} EUR, {usd.toFixed(2)} USD
            </li>
          </ul>
        </CardContent>
      </Card>
    </Link>
  );
};
