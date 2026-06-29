import MemberActionBar from "./MemberActionBar";
const statusClasses = {
  green: "bg-green-300 text-green-900",
  yellow: "bg-yellow-300 text-yellow-900",
  blue: "bg-blue-300 text-blue-900",
  red: "bg-red-300 text-red-900",
};

function MemberDetailsHeader({ member }) {
  return (
    <div className="rounded-2xl bg-white p-4">
      <div className="flex items-center justify-between rounded-2xl px-3 py-2 pb-4">
        <div className="flex flex-col gap-3">
          <h3 className="text-2xl font-bold sm:text-3xl">{member.full_name}</h3>
          <span className="block text-[15px] font-semibold text-stone-500">
            {member.phone ? member.phone : " رقم الهاتف غير مسجل "}
          </span>
        </div>

        <div className="flex flex-col items-center gap-3">
          <span className="text-xl font-bold text-orange-500">
            #{member.id}
          </span>

          <span
            className={`${statusClasses[member.status_color]} rounded-md px-1.5 py-1`}
          >
            {member.status_text}
          </span>
        </div>
      </div>
      <MemberActionBar member={member} inDetailsPage={true} />
    </div>
  );
}

export default MemberDetailsHeader;
