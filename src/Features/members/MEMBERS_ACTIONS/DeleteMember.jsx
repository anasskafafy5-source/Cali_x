import { FaTrash } from "react-icons/fa6";
import Button from "../../../ui/Button";
import { useState } from "react";
import Modal from "../../../ui/Modal";
import ConfirmModal from "../../../ui/ConfirmModal";
import { useDeleteMember } from "../useDeleteMember";

function DeleteMember({ member }) {
  const [isOpen, setIsOpen] = useState(false);
  const { removeMemberMutation, isDeleting } = useDeleteMember();

  function handleDelete() {
    removeMemberMutation(Number(member?.id), {
      onSettled: () => {
        setIsOpen(false);
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
