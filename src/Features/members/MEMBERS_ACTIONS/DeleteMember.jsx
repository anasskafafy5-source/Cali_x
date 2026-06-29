import { FaTrash } from "react-icons/fa6";
import Button from "../../../ui/Button";
import { useState } from "react";
import Modal from "../../../ui/Modal";
import ConfirmModal from "../../../ui/ConfirmModal";
import { useDeleteMember } from "../useDeleteMember";
import { useNavigate } from "react-router-dom";

function DeleteMember({ member, inDetailsPage }) {
  const [isOpen, setIsOpen] = useState(false);
  const { removeMemberMutation, isDeleting } = useDeleteMember();
  const navigate = useNavigate();

  function handleDelete() {
    removeMemberMutation(Number(member?.id), {
      onSettled: () => {
        setIsOpen(false);
        if (inDetailsPage) {
          navigate(-1);
        }
      },
    });
  }

  return (
    <>
      <Button design={"delete"} onClick={() => setIsOpen(true)}>
        <FaTrash className="mx-auto text-stone-200" />
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ConfirmModal onConfirm={handleDelete} isLoading={isDeleting} />
      </Modal>
    </>
  );
}

export default DeleteMember;
