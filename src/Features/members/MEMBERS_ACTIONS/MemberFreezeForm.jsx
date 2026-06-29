import { useForm } from "react-hook-form";
import Button from "../../../ui/Button";
import { buildFreezeData } from "../../../utils/helpers";
import { useUpdateMemberData } from "../useUpdateMemberData";
import Spinner from "../../../ui/Spinner";
import { formatCurrency } from "../../../utils/helpers";

function MemberFreezeForm({ member, onClose }) {
  const { updateMember: updateMemberMutation, isUpdating } =
    useUpdateMemberData();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      frozen_days: "",
      freeze_reason: "",
    },
  });

  function submit(data) {
    const temp = buildFreezeData(data, member);
    updateMemberMutation({ id: member.id, memberData: temp });

    onClose?.();
  }
  if (isUpdating) return <Spinner />;
  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="space-y-6 rounded-xl bg-white p-6"
    >
      {/* Member Info */}

      <div className="rounded-xl border border-amber-300 bg-amber-50 p-5 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-amber-900">
            {member.full_name}
          </h2>

          <span
            className={`rounded-full px-3 py-1 text-sm font-semibold ${
              member.remaining_amount > 0
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {member.remaining_amount > 0
              ? `متبقي ${formatCurrency(member.remaining_amount)} جنيه`
              : "مدفوع بالكامل"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
          <div>
            <p className="text-gray-500">بداية الاشتراك</p>
            <p className="font-semibold">{member.subscription_start_date}</p>
          </div>

          <div>
            <p className="text-gray-500">نهاية الاشتراك</p>
            <p className="font-semibold">{member.subscription_end_date}</p>
          </div>

          <div>
            <p className="text-gray-500">سعر الاشتراك</p>
            <p className="font-semibold">
              {formatCurrency(member.subscription_price)} جنيه
            </p>
          </div>

          <div>
            <p className="text-gray-500">المبلغ المتبقي</p>

            <p
              className={`font-bold ${
                member.remaining_amount > 0 ? "text-red-600" : "text-green-600"
              }`}
            >
              {formatCurrency(member.remaining_amount)} جنيه
            </p>
          </div>
        </div>
      </div>

      {/* Freeze Days */}

      <div>
        <label className="mb-2 block font-medium">عدد أيام التجميد</label>

        <input
          type="number"
          min="1"
          {...register("frozen_days", {
            required: "عدد الأيام مطلوب",
            min: {
              value: 1,
              message: "يجب أن يكون أكبر من صفر",
            },
          })}
          className="w-full rounded-lg border px-4 py-3 transition outline-none focus:border-amber-500"
        />

        {errors.frozen_days && (
          <p className="mt-1 text-sm text-red-600">
            {errors.frozen_days.message}
          </p>
        )}
      </div>

      {/* Freeze Reason */}

      <div>
        <label className="mb-2 block font-medium">سبب التجميد</label>

        <textarea
          rows={4}
          {...register("freeze_reason", {
            maxLength: {
              value: 250,
              message: "السبب طويل جداً",
            },
          })}
          className="w-full resize-none rounded-lg border px-4 py-3 transition outline-none focus:border-amber-500"
          placeholder="اكتب سبب التجميد..."
        />

        {errors.freeze_reason && (
          <p className="mt-1 text-sm text-red-600">
            {errors.freeze_reason.message}
          </p>
        )}
      </div>

      {/* Buttons */}

      <div className="flex justify-end gap-3">
        <Button type="button" design="secondary" onClick={onClose}>
          إلغاء
        </Button>

        <Button type="submit" disabled={isSubmitting}>
          حفظ التجميد
        </Button>
      </div>
    </form>
  );
}

export default MemberFreezeForm;
