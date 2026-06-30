import { useForm } from "react-hook-form";
import DatePickerInput from "../../../ui/DatePickerInput";
import Button from "../../../ui/Button";
import { buildRenewalData, formatCurrency } from "../../../utils/helpers";
import Spinner from "../../../ui/Spinner";
import { useRenewalMember } from "../useRenewalMember";

function MemberRenewalForm({ member, onClose }) {
  const { renewalMutation, isPending } = useRenewalMember();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      paid_amount: member.subscription_price,
      notes: "",
    },
  });

  const startDate = watch("subscription_start_date");
  const subscriptionPrice = Number(member.subscription_price);

  const paidAmount = Number(watch("paid_amount") ?? 0);

  const remaining = Math.max(subscriptionPrice - paidAmount, 0);

  function onSubmit(values) {
    const temp = buildRenewalData(values, member);
    renewalMutation({
      id: Number(member.id),
      memberData: temp,
      amountPaid: values.paid_amount,
    });
    onClose?.();
  }
  if (isPending) return <Spinner />;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-6">
      <h2 className="text-2xl font-bold">تجديد الاشتراك</h2>

      {/* بيانات العضو */}
      <div className="space-y-1 rounded-lg bg-orange-100 p-3 text-orange-900">
        <p>
          العضو: <span className="font-semibold">{member.full_name}</span>
        </p>

        <p>
          تاريخ انتهاء الاشتراك السابق:
          <span className="font-semibold"> {member.subscription_end_date}</span>
        </p>

        <p>
          سعر الاشتراك:
          <span className="font-semibold">
            {" "}
            {formatCurrency(subscriptionPrice)} جنيه
          </span>
        </p>

        {member.has_remaining && (
          <p className="font-medium text-red-700">
            متبقي من الاشتراك السابق:
            <span> {formatCurrency(member.remaining_amount)} جنيه</span>
          </p>
        )}
      </div>

      <p className="text-sm text-stone-500">اختر فترة الاشتراك الجديدة.</p>

      {/* بداية الاشتراك */}
      <DatePickerInput
        name="subscription_start_date"
        control={control}
        label="تاريخ بداية الاشتراك"
        placeholder="اختر تاريخ البداية"
        rules={{
          required: "تاريخ بداية الاشتراك مطلوب",
        }}
      />

      {/* نهاية الاشتراك */}
      <DatePickerInput
        name="subscription_end_date"
        control={control}
        label="تاريخ نهاية الاشتراك"
        placeholder="اختر تاريخ النهاية"
        minDate={startDate}
        rules={{
          required: "تاريخ نهاية الاشتراك مطلوب",
          validate: (value) =>
            !startDate ||
            value >= startDate ||
            "يجب أن يكون تاريخ النهاية بعد تاريخ البداية",
        }}
      />

      {/* المدفوع */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">المبلغ المدفوع</label>

        <input
          type="number"
          placeholder="المبلغ المدفوع"
          className="w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-orange-500"
          {...register("paid_amount", {
            required: "المبلغ المدفوع مطلوب",
            valueAsNumber: true,

            validate: {
              positive: (value) => value >= 0 || "لا يمكن إدخال رقم سالب",

              max: (value) =>
                value <= subscriptionPrice ||
                "المبلغ المدفوع أكبر من سعر الاشتراك",
            },
          })}
        />

        {errors.paid_amount && (
          <p className="text-sm text-red-600">{errors.paid_amount.message}</p>
        )}
      </div>

      {/* ملخص العملية */}
      <div className="space-y-2 rounded-lg border bg-stone-50 p-4">
        <h3 className="font-semibold">ملخص العملية</h3>

        <div className="flex justify-between">
          <span>سعر الاشتراك</span>
          <span>{formatCurrency(subscriptionPrice)} جنيه</span>
        </div>

        <div className="flex justify-between">
          <span>المدفوع</span>
          <span>{formatCurrency(paidAmount)} جنيه</span>
        </div>

        <div className="flex justify-between font-semibold text-orange-600">
          <span>المتبقي</span>
          <span>{formatCurrency(remaining)} جنيه</span>
        </div>
      </div>

      {/* ملاحظات */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">ملاحظات</label>

        <textarea
          rows={4}
          placeholder="اكتب أي ملاحظات..."
          className="w-full resize-none rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-orange-500"
          {...register("notes")}
        />
      </div>

      <div className="flex justify-end gap-3 border-t pt-5">
        <Button type="button" design="secondary" onClick={onClose}>
          إلغاء
        </Button>

        <Button type="submit">تجديد</Button>
      </div>
    </form>
  );
}

export default MemberRenewalForm;
