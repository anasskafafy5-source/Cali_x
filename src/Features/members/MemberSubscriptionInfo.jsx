import {
  FaMoneyBillWave,
  FaCalendarPlus,
  FaCalendarCheck,
  FaClockRotateLeft,
  FaHourglassHalf,
  FaCircleCheck,
  FaCreditCard,
  FaTriangleExclamation,
} from "react-icons/fa6";

function MemberSubscriptionInfo({ member }) {
  const isExpired = member.days_left < 0;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="mb-4 border-b border-slate-100 pb-2">
        <h3 className="text-base font-bold text-slate-800">معلومات الاشتراك</h3>
      </div>

      <div className="space-y-2">
        <InfoRow
          icon={<FaMoneyBillWave />}
          label="سعر الاشتراك"
          value={`${member.subscription_price} ج.م`}
        />

        <InfoRow
          icon={<FaCalendarPlus />}
          label="بداية الاشتراك"
          value={member.subscription_start_date}
        />

        <InfoRow
          icon={<FaCalendarCheck />}
          label="نهاية الاشتراك"
          value={member.subscription_end_date}
        />

        <InfoRow
          icon={<FaClockRotateLeft />}
          label="آخر دفعة"
          value={member.last_payment_date || "لا يوجد"}
        />

        <InfoRow
          icon={<FaHourglassHalf />}
          label={isExpired ? "انتهى الاشتراك" : "المتبقي"}
          value={
            isExpired
              ? `منذ ${Math.abs(member.days_left)} يوم`
              : `${member.days_left} يوم`
          }
          color={isExpired ? "text-red-600" : "text-slate-800"}
        />

        <InfoRow
          icon={<FaCircleCheck />}
          label="الحالة"
          value={member.status_text}
          color={
            member.status_color === "green"
              ? "text-green-600"
              : member.status_color === "yellow"
                ? "text-amber-600"
                : "text-red-600"
          }
        />

        <InfoRow
          icon={<FaCreditCard />}
          label="الدفع"
          value={member.has_remaining ? "يوجد مستحقات" : "مدفوع"}
          color={member.has_remaining ? "text-red-600" : "text-green-600"}
        />

        <InfoRow
          icon={<FaTriangleExclamation />}
          label="المستحقات"
          value={
            member.has_remaining ? `${member.remaining_amount} ج.م` : "لا توجد"
          }
          color={member.has_remaining ? "text-red-600" : "text-green-600"}
        />
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value, color = "text-slate-800" }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 px-3 py-2 transition-colors hover:bg-slate-100">
      <div className="flex min-w-0 items-center gap-2.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-sm text-green-600">
          {icon}
        </div>

        <span className="text-[12px] font-medium text-slate-500">{label}</span>
      </div>

      <span
        className={`max-w-[120px] truncate text-[13px] font-semibold ${color}`}
      >
        {value}
      </span>
    </div>
  );
}

export default MemberSubscriptionInfo;
