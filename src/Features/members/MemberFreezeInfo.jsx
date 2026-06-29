import { FaSnowflake, FaClock, FaRegNoteSticky } from "react-icons/fa6";
import Button from "../../ui/Button";
import { useUpdateMemberData } from "./useUpdateMemberData";
import Spinner from "../../ui/Spinner";
import { buildUnfreezeMemberData } from "../../utils/helpers";

function MemberFreezeInfo({ member }) {
  const isFrozen = member.is_frozen;

  const { updateMember: updateMemberMutation, isUpdating } =
    useUpdateMemberData();

  function onFreeze() {
    const temp = buildUnfreezeMemberData(member);
    updateMemberMutation({id: member.id , memberData: temp});
  }

  if (isUpdating) return <Spinner />;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-2">
        <div className="flex items-center gap-2">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-lg ${
              isFrozen
                ? "bg-sky-100 text-sky-600"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            <FaSnowflake />
          </div>

          <h3 className="text-base font-bold text-slate-800">
            معلومات التجميد
          </h3>
        </div>

        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
            isFrozen ? "bg-sky-100 text-sky-700" : "bg-green-100 text-green-700"
          }`}
        >
          {isFrozen ? "مجمد" : "غير مجمد"}
        </span>
      </div>

      {isFrozen ? (
        <>
          <div className="space-y-2">
            <InfoRow
              icon={<FaClock />}
              label="مدة التجميد"
              value={`${member?.frozen_days} يوم`}
            />

            <InfoRow
              icon={<FaRegNoteSticky />}
              label="الملاحظات"
              value={member.freeze_reason || "لا توجد ملاحظات"}
            />
          </div>

          <Button
            design="delete"
            className="mt-4 w-full"
            onClick={() => onFreeze()}
          >
            إلغاء التجميد
          </Button>
        </>
      ) : (
        <div className="flex min-h-[170px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <FaSnowflake className="text-lg" />
          </div>

          <p className="font-semibold text-slate-600">العضو غير مجمد</p>

          <p className="mt-1 text-xs text-slate-400">
            لا يوجد أي تجميد نشط لهذا العضو.
          </p>
        </div>
      )}
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 px-3 py-2">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 text-sky-600">
          {icon}
        </div>

        <span className="text-xs font-medium text-slate-500">{label}</span>
      </div>

      <span className="max-w-[120px] truncate text-sm font-semibold text-slate-800">
        {value}
      </span>
    </div>
  );
}

export default MemberFreezeInfo;
