import {
  FaUser,
  FaPhone,
  FaUserTie,
  FaCalendarDays,
  FaClock,
  FaEye,
  FaRotate,
  FaSnowflake,
  FaPen,
  FaTrash,
} from "react-icons/fa6";
import MemberViewDetails from "./MEMBERS_ACTIONS/MemberViewDetails";
import Member_renewal from "./MEMBERS_ACTIONS/Member_renewal";
import MemberForzen from "./MEMBERS_ACTIONS/MemberForzen";
import EditMemberData from "./MEMBERS_ACTIONS/EditMemberData";
import DeleteMember from "./MEMBERS_ACTIONS/DeleteMember";

function MemberCard({ member }) {
  const statusColors = {
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    red: "bg-red-100 text-red-700",
    gray: "bg-gray-100 text-gray-700",
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Top Border */}
      <div className="h-1 bg-orange-500" />

      <div className="space-y-5 p-5">
        {/* Header */}
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold text-slate-800">
            <FaUser className="text-orange-500" />
            {member.full_name}
          </h2>

          <div className="mt-3 space-y-2 text-sm text-slate-600">
            <p className="flex items-center gap-2">
              <FaPhone />
              {member.phone || "غير مسجل"}
            </p>

            <p className="flex items-center gap-2">
              <FaUserTie />
              {member.captain_name}
            </p>
          </div>
        </div>

        {/* Subscription */}
        <div className="rounded-xl bg-orange-50 p-4">
          <h3 className="mb-3 font-semibold text-slate-700">الاشتراك</h3>

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FaCalendarDays className="text-orange-500" />
                البداية
              </span>

              <span>{member.subscription_start_date}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FaCalendarDays className="text-orange-500" />
                النهاية
              </span>

              <span>{member.subscription_end_date}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FaClock className="text-orange-500" />
                المتبقي
              </span>

              <span>{member.days_left} يوم</span>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                statusColors[member.status_color] || "bg-gray-100 text-gray-700"
              }`}
            >
              {member.status_text}
            </span>

            {member.has_remaining ? (
              <>
                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                  💰 عليه {member.remaining_amount} ج.م
                </span>

                <button className="rounded-full bg-orange-500 px-4 py-1 text-xs font-semibold text-white transition hover:bg-orange-600">
                  دفع الباقي
                </button>
              </>
            ) : (
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                💰 مدفوع بالكامل
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="border-t pt-4">
          <h3 className="mb-3 text-sm font-semibold text-slate-600">
            الإجراءات
          </h3>

          <div className="grid grid-cols-5 gap-2">
            <MemberViewDetails id={member.id} />

            <Member_renewal member={member} />

            <MemberForzen member={member} />

            <EditMemberData member={member} />

            <DeleteMember member={member} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberCard;
