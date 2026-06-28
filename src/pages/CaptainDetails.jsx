import CaptainDetArea from "../Features/captains/CaptainDetArea";
import BackButton from "../ui/BackButton";

function CaptainDetails() {
  return (
    <>
      <div className="flex items-center gap-2.5">
        <BackButton />
        <div>
          <h3 className="text-[18px] font-bold">تفاصيل المدرب </h3>
          <span className="text-xs font-semibold text-stone-400">
            بيانات المدرب وقائمة الأعضاء
          </span>
        </div>
      </div>
      <CaptainDetArea />
    </>
  );
}

export default CaptainDetails;
