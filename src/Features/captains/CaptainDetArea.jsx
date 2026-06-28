import { useParams } from "react-router-dom";
import CaptainInfoCart from "./CaptainInfoCart";
import { useGetCaptainById } from "./useGetCaptainById";
import Spinner from "../../ui/Spinner";
import Error from "../../ui/Error";

function CaptainDetArea() {
  const { id } = useParams();

  const { captain, isPending, error } = useGetCaptainById(id);

  if (isPending) return <Spinner />;
  if (error) return <Error />;
  return (
    <div className="mt-5">
      {" "}
      <CaptainInfoCart captain={captain} />
    </div>
  );
}

export default CaptainDetArea;
