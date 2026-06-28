import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CaptainForm from "./CaptainForm";

function AddCaptainButton() {
  const [isOpen, setIsopen] = useState(false);
  return (
    <div>
      <Button size="big" onClick={() => setIsopen(true)}>اضافه مدرب +</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsopen(false)}
      >
        <CaptainForm />
      </Modal>
    </div>
  );
}

export default AddCaptainButton;
