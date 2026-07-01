import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import TransactionForm from "./TransactionForm";

function AddNewTransaction() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>اضافه عمليه مصرفيه</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <TransactionForm />
      </Modal>
    </>
  );
}

export default AddNewTransaction;
