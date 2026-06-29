import {
  FaUser,
  FaPhone,
  FaCakeCandles,
  FaUserTie,
} from "react-icons/fa6";

function MemberPersonalInfo({ member }) {
  return (
    <div className=" rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-5 border-b border-slate-100 pb-3">
        <h3 className="text-lg font-bold text-slate-800">
          المعلومات الشخصية
        </h3>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <InfoRow
          icon={<FaUser />}
          label="الاسم"
          value={member.full_name}
        />

        <InfoRow
          icon={<FaPhone />}
          label="رقم الهاتف"
          value={member.phone || "غير مسجل"}
        />

        <InfoRow
          icon={<FaCakeCandles />}
          label="السن"
          value={member.age ? `${member.age} سنة` : "غير محدد"}
        />

        <InfoRow
          icon={<FaUserTie />}
          label="المدرب"
          value={member.captain_name || "غير محدد"}
        />
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-slate-500">
          {label}
        </p>

        <p className="truncate text-sm font-semibold text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}

export default MemberPersonalInfo;