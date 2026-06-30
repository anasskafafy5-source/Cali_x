import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import SessionForm from "./SessionForm";
import { useGetSettings } from "../settings/useGetSettings";
import Spinner from "../../ui/Spinner";
import { useCaptainStats } from "../captains/useCaptainState";
import Error from "../../ui/Error";

function AddSessionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, isLoading } = useGetSettings();

  const { captainStats, isPending, error } = useCaptainStats();

  if (isLoading || isPending) return <Spinner />;
  if (error) return <Error />;
  return (
    <>
      <Button onClick={() => setIsOpen(true)} size="big">
        + اضافه حصه
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <SessionForm
          defaultPrice={settings.session_price}
          captains={captainStats}
        />
      </Modal>
    </>
  );
}

export default AddSessionButton;
