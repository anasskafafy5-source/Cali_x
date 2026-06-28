import { useState } from "react";
import Button from "../../../ui/Button";
import { FaRotate } from "react-icons/fa6";
import Modal from "../../../ui/Modal";
import MemberRenewalForm from "./MemberRenewalForm";
import Error from "../../../ui/Error";

function Member_renewal({ member }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button design="secondary" onClick={() => setIsOpen(true)}>
        <FaRotate className="mx-auto text-slate-700" />
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {member.has_remaining ? (
          <Error
            title="لا يمكن التجديد"
            message="لا يمكن التجديد لهذا الاعب اللي عند دفع المبلغ اللي عليه"
          />
        ) : (
          <MemberRenewalForm member={member} />
        )}
      </Modal>
    </>
  );
}

export default Member_renewal;
