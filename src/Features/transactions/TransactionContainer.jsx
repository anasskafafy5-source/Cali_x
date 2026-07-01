import Spinner from "../../ui/Spinner";
import Error from "../../ui/Error";
import { useGetTransactions } from "./useGetTransactions";
import TransactionCard from "./TransactionCard";

function TransactionContainer() {
  const { transactions, isLoading, error } = useGetTransactions();
  console.log(transactions);
  if (isLoading) return <Spinner />;
  if (error) return <Error />;
  return (
    <div className="mt-3 flex flex-col gap-3 p-1">
      {transactions.map((transaction) => (
        <TransactionCard key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
}

export default TransactionContainer;
