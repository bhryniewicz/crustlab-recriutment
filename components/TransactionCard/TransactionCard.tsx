import { Transaction, TransactionType } from "@/types/transactions";
import { formatDate } from "date-fns";
import { Card } from "../ui/card";
import { ArrowRight } from "lucide-react";

export const TransactionCard = ({
  transaction,
}: {
  transaction: Transaction;
}) => {
  const { type } = transaction;

  let content;

  switch (type) {
    case "Transfer":
      content = (
        <CardLayout
          title="Transfer balance to other user"
          transaction={transaction}
          type={type}
        />
      );
      break;
    case "Withdraw Balance":
      content = (
        <CardLayout
          title="Withdraw balance from account"
          transaction={transaction}
          type={type}
        />
      );
      break;
    case "Add Balance":
      content = (
        <CardLayout
          title="Add balance to your account"
          transaction={transaction}
          type={type}
        />
      );
      break;
    case "Currency exchange":
      content = (
        <CardLayout
          title="Exchange currencies"
          transaction={transaction}
          type={type}
        />
      );
      break;
    default:
      content = <p>Unknown transaction type</p>;
  }

  return <div>{content}</div>;
};

export const CardLayout = ({
  title,
  transaction,
  type,
}: {
  title: string;
  transaction: Transaction;
  type: TransactionType;
}) => {
  const {
    receiver,
    date,
    amount,
    currency,
    currency_send,
    currency_received,
    exchange_rate,
  } = transaction;

  return (
    <Card className="flex justify-between items-center px-8 py-4 ">
      <div>
        <p className="font-bold text-xs text-[#9430f3]">{title}</p>
        {type === "Currency exchange" ? (
          <p className="flex gap-2 items-center font-bold text-lg uppercase">
            {currency_send} <ArrowRight size={16} /> {currency_received}
          </p>
        ) : (
          <p className="font-bold text-lg">{receiver}</p>
        )}
        <p className="font-light text-gray-500 text-sm">
          {formatDate(date, "dd/MM/yyyy")}
        </p>
      </div>
      {type === "Currency exchange" ? (
        <div className="flex flex-col items-end">
          <p className="font-bold">
            + {(amount * exchange_rate!).toFixed(2)}{" "}
            <span className="uppercase">{currency_received}</span>
          </p>
          <p className="font-light text-gray-500 text-sm">
            - {amount} <span className="uppercase">{currency_send}</span>
          </p>
        </div>
      ) : (
        <>
          {(type === "Add Balance" || type === "Withdraw Balance") && (
            <p className="font-bold">
              {type === "Add Balance" ? "+" : "-"} {amount}{" "}
              <span className="uppercase">{currency}</span>
            </p>
          )}

          {type === "Transfer" && (
            <p className="font-bold">
              {amount < 0 ? `- ${-amount}` : `+ ${amount}`}{" "}
              <span className="uppercase">{currency}</span>
            </p>
          )}
        </>
      )}
    </Card>
  );
};
