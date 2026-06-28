import { FaPen } from "react-icons/fa6";
import Button from "../../../ui/Button";
import { useState } from "react";
import Modal from "../../../ui/Modal";
import MembersMainForm from "../MembersMainForm";

function EditMemberData({ member }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <FaPen className="mx-auto text-stone-100" />
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <MembersMainForm member={member} />
      </Modal>
    </>
  );
}

export default EditMemberData;
