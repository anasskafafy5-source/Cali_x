import Spinner from "../../ui/Spinner";
import Error from "../../ui/Error";
import CaptainBox from "./CaptainBox";
import { useCaptainStats } from "./useCaptainState";

function CaptainsArea() {
  const { captainStats, isPending, error } = useCaptainStats();

  if (isPending) return <Spinner />;

  if (error) return <Error />;
  return (
    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {captainStats.map((captain) => (
        <CaptainBox key={captain.id} captain={captain} />
      ))}
    </div>
  );
}

export default CaptainsArea;
