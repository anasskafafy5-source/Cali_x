import AddCaptainButton from "../Features/captains/AddCaptainButton";
import CaptainsArea from "../Features/captains/CaptainsArea";
import { useCaptainStats } from "../Features/captains/useCaptainState";
import PageHeader from "../ui/PageHeader";
import Spinner from "../ui/Spinner";

function CaptainsPage() {
  const { captainsCount, isPending } = useCaptainStats();

  if (isPending) return <Spinner />;
  return (
    <>
      <PageHeader>
        <div className="flex flex-col gap-1">
          <h3 className="font-bold">المدربين</h3>{" "}
          <span className="block text-xs font-semibold text-stone-400">
            {captainsCount ? captainsCount : ""} من المدربين مسجلين
          </span>
        </div>

        <AddCaptainButton />
      </PageHeader>
      <CaptainsArea />
    </>
  );
}

export default CaptainsPage;
