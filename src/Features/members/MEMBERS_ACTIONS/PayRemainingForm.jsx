import { useForm } from "react-hook-form";
import Button from "../../../ui/Button";
import { usePayBackMember } from "../usePayBackMember";

import Spinner from "../../../ui/Spinner";
import { buildPayRemainingData } from "../../../utils/helpers";
import { formatCurrency } from "../../../utils/helpers";

function PayRemainingForm({ member, onClose }) {
  const { paybackMutation, isPending } = usePayBackMember();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      paid_amount: "",
    },
  });

  const payment = Number(watch("paid_amount")) || 0;
  const remainingAfterPayment = Math.max(
    Number(member.remaining_amount) - payment,
    0,
  );

  function onSubmit(data) {
    const updatedData = buildPayRemainingData(data, member);

    paybackMutation({
      id: Number(member.id),
      memberData: updatedData,
      amountPaid: data.paid_amount,
    });

    onClose?.();
  }

  if (isPending) return <Spinner />;

  return (
    <form
      dir="rtl"
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto w-full max-w-2xl space-y-6 px-1.5 py-3.5"
    >
      {/* Header */}
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">دفع باقي الاشتراك</h2>

        <p className="mt-1 text-sm text-gray-500">
          قم بإدخال المبلغ الذي قام اللاعب بسداده.
        </p>
      </div>

      {/* Member Information */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b bg-gray-50 px-6 py-4">
          <h3 className="font-semibold text-gray-700">بيانات اللاعب</h3>
        </div>

        <div className="px-6">
          <Row label="اسم اللاعب" value={member.full_name} />

          <Row label="بداية الاشتراك" value={member.subscription_start_date} />

          <Row label="نهاية الاشتراك" value={member.subscription_end_date} />

          <Row
            label="سعر الاشتراك"
            value={
              <span className="font-bold text-blue-600">
                {formatCurrency(member.subscription_price)} جنيه
              </span>
            }
          />

          <Row
            label="المدفوع"
            value={
              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                {formatCurrency(member.paid_amount)} جنيه
              </span>
            }
          />

          <Row
            label="المتبقي"
            border={false}
            value={
              <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
                {formatCurrency(member.remaining_amount)} جنيه
              </span>
            }
          />
        </div>
      </div>

      {/* Payment */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          المبلغ المدفوع
        </label>

        <input
          type="number"
          min={1}
          max={member.remaining_amount}
          placeholder="أدخل المبلغ"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-lg transition-all duration-200 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          {...register("paid_amount", {
            required: "يرجى إدخال المبلغ",

            valueAsNumber: true,

            min: {
              value: 1,
              message: "المبلغ يجب أن يكون أكبر من صفر",
            },

            validate: (value) =>
              value <= member.remaining_amount ||
              "لا يمكن دفع مبلغ أكبر من المتبقي",
          })}
        />

        {errors.paid_amount && (
          <p className="text-sm text-red-500">{errors.paid_amount.message}</p>
        )}
      </div>

      {/* Remaining */}
      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-600">المتبقي بعد الدفع</span>

          <span className="text-2xl font-bold text-blue-600">
            {formatCurrency(remainingAfterPayment)} جنيه
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-end gap-3 border-t pt-5">
        <Button type="button" design="secondary" onClick={onClose}>
          إلغاء
        </Button>

        <Button type="submit">تأكيد الدفع</Button>
      </div>
    </form>
  );
}

function Row({ label, value, border = true }) {
  return (
    <div
      className={`flex items-center justify-between py-4 ${
        border ? "border-b border-gray-100" : ""
      }`}
    >
      <span className="font-medium text-gray-500">{label}</span>

      <div className="font-semibold text-gray-800">{value}</div>
    </div>
  );
}

export default PayRemainingForm;
