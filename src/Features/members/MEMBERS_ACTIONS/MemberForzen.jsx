import { useState } from "react";
import Button from "../../../ui/Button";
import { FaSnowflake } from "react-icons/fa6";
import Modal from "../../../ui/Modal";
import MemberFreezeForm from "./MemberFreezeForm";
import Error from "../../../ui/Error";

function MemberForzen({ member }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button design="cold" onClick={() => setIsOpen(true)}>
        <FaSnowflake className="mx-auto text-slate-700" />
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {member.is_frozen ? (
          <Error title="لا يمكن التجميد " message="لاعب مجمد بالفعل" />
        ) : (
          <MemberFreezeForm member={member} />
        )}
      </Modal>
    </>
  );
}

export default MemberForzen;
