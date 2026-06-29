import { FaRegNoteSticky } from "react-icons/fa6";

function MemberNotes({ member }) {
  const hasNotes = member.notes && member.notes.trim().length > 0;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
          <FaRegNoteSticky />
        </div>

        <h3 className="text-base font-bold text-slate-800">الملاحظات</h3>
      </div>

      {hasNotes ? (
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-sm leading-7 break-words whitespace-pre-wrap text-slate-700">
            {member.notes}
          </p>
        </div>
      ) : (
        <div className="flex min-h-[120px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <FaRegNoteSticky className="text-lg" />
          </div>

          <p className="font-medium text-slate-500">لا توجد ملاحظات</p>

          <p className="mt-1 text-xs text-slate-400">
            لم يتم إضافة أي ملاحظات لهذا العضو.
          </p>
        </div>
      )}
    </div>
  );
}

export default MemberNotes;
