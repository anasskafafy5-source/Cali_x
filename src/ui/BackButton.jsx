import { useNavigate } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";

function BackButton() {
  const navigate = useNavigate();
  return (
    <button
      className="block cursor-pointer rounded-[3px] p-1.5 text-xl text-stone-700 duration-300 hover:bg-white hover:text-orange-500"
      onClick={() => navigate(-1)}
    >
      <FaAngleRight />
    </button>
  );
}

export default BackButton;
