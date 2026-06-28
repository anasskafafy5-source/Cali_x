import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import MembersMainForm from "./MembersMainForm";

function AddMemberButton() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setIsOpen(true)} size="big">
        إضافة عضو +
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <MembersMainForm />
      </Modal>
    </div>
  );
}

export default AddMemberButton;
