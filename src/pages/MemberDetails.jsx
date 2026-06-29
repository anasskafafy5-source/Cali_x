import DetailsMemberArea from "../Features/members/DetailsMemberArea";
import BackButton from "../ui/BackButton";

function MemberDetails() {
  return (
    <>
      <div className="flex items-center gap-2.5">
        <BackButton />
        <div>
          <h3 className="text-[18px] font-bold">تفاصيل المشترك </h3>
          <span className="text-xs font-semibold text-stone-400">
            بيانات العضو وحالة الاشتراك
          </span>
        </div>
      </div>

      <DetailsMemberArea />
    </>
  );
}

export default MemberDetails;
