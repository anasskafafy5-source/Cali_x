import AddNewTransaction from "../Features/transactions/AddNewTransaction";
import TransactionsContainer from "../Features/transactions/TransactionContainer";
function Transactions() {
  return (
    <div>
      <AddNewTransaction />
      <TransactionsContainer />
    </div>
  );
}

export default Transactions;
