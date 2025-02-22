import { Balance } from "@/types/users";
import { Card } from "../ui/card";

export const UserBalance = ({ balance }: { balance: Balance }) => {
  const { pln, eur, usd } = balance;

  return (
    <div>
      <h3 className="font-bold text-xl mb-4">Current balance</h3>
      <ul className="flex flex-col md:flex-row gap-4">
        <Card className="w-full h-[150px] md:h-[200px] flex flex-col justify-center items-center text-[#9430f3] font-bold text-3xl">
          <p>{pln.toFixed(2)} PLN</p>
          <p className="font-light text-lg">Polish zloty</p>
        </Card>
        <Card className="w-full h-[150px] md:h-[200px] flex flex-col justify-center items-center text-[#9430f3] font-bold text-3xl">
          <p>{eur.toFixed(2)} €</p>
          <p className="font-light text-lg">Euro</p>
        </Card>
        <Card className="w-full h-[150px] md:h-[200px] flex flex-col justify-center items-center text-[#9430f3] font-bold text-3xl">
          <p>{usd.toFixed(2)} $</p>
          <p className="font-light text-lg">US Dollar</p>
        </Card>
      </ul>
    </div>
  );
};
