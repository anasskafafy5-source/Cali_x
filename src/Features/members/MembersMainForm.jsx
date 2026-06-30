import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import DatePickerInput from "../../ui/DatePickerInput";
import { useCaptainStats } from "../captains/useCaptainState";
import Spinner from "../../ui/Spinner";
import { buildMemberData, buildUpdateMemberData } from "../../utils/helpers";
import { useAddMember } from "./useAddMember";
import { useUpdateMemberData } from "./useUpdateMemberData";

function MembersMainForm({ onClose, member }) {
  const isEditSession = Boolean(member);

  const { captainStats, isPending } = useCaptainStats();
  const { addMemberMutation } = useAddMember();
  // for edit
  const { updateMember: updateMemberMutation, isUpdating } =
    useUpdateMemberData();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      full_name: member?.full_name || "",
      captain: member?.captain_id || "",
      phone: member?.phone || "",
      age: member?.age || "",
      subscription_price: member?.subscription_price || "",
      subscription_start_date: member?.subscription_start_date
        ? new Date(member.subscription_start_date)
        : null,
      subscription_end_date: member?.subscription_end_date
        ? new Date(member.subscription_end_date)
        : null,
      paid_amount: member?.paid_amount || 0,
      notes: member?.notes || "",
    },
  });
  const startDate = watch("subscription_start_date");
  const subscriptionPrice = watch("subscription_price");
  const paidAmount = watch("paid_amount") || 0;
  const remaining = subscriptionPrice - paidAmount;

  function onSubmit(data) {
    if (!isEditSession) {
      const newMember = buildMemberData(data, captainStats);
      addMemberMutation(newMember);
    } else {
      const temp = buildUpdateMemberData(data, captainStats, member);
      updateMemberMutation({ id: member.id, memberData: temp });
    }
    onClose?.();
  }

  if (isPending || isUpdating) return <Spinner />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-6">
      <h2 className="text-2xl font-bold">
        {isEditSession ? "تعديل بيانات العضو" : "إضافه عضو جديد"}
      </h2>

      {/* الاسم */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">الاسم</label>

        <input
          type="text"
          placeholder="اسم العضو"
          className="w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-orange-500"
          {...register("full_name", {
            required: "الاسم مطلوب",
          })}
        />

        {errors.full_name && (
          <p className="text-sm text-red-600">{errors.full_name.message}</p>
        )}
      </div>

      {/* Select the Captain */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">المدرب</label>
        <select
          className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 outline-none focus:border-orange-500"
          {...register("captain", {
            required: "اختيار المدرب مطلوب",
          })}
        >
          <option value={""} disabled>
            اختار المدرب
          </option>
          {captainStats?.map((cap, i) => (
            <option value={cap.id} key={i}>
              {cap.full_name}
            </option>
          ))}
        </select>
        <p className="mt-1 w-fit rounded-sm p-1 text-sm font-semibold text-orange-500">
          عليك التاكد من اختيار المدرب الصحيح
        </p>
        {errors.captain && (
          <p className="text-sm text-red-600">{errors.captain.message}</p>
        )}
      </div>

      {/* رقم الهاتف */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">رقم الهاتف</label>

        <input
          type="tel"
          placeholder="01xxxxxxxxx"
          className="w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-orange-500"
          {...register("phone", {
            pattern: {
              value: /^01[0125][0-9]{8}$/,
              message: "رقم الهاتف غير صحيح",
            },
          })}
        />

        {errors.phone && (
          <p className="text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      {/* the age */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">العمر</label>

        <input
          type="number"
          placeholder="العمر"
          className="w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-orange-500"
          {...register("age", {
            valueAsNumber: true,
            min: {
              value: 4,
              message: "العمر يجب أن يكون أكبر من 4 سنوات",
            },
            max: {
              value: 80,
              message: "العمر غير صحيح",
            },
          })}
        />

        {errors.age && (
          <p className="text-sm text-red-600">{errors?.age.message}</p>
        )}
      </div>

      {/* سعر الاشتراك */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">سعر الاشتراك</label>

        <input
          type="number"
          placeholder="سعر الاشتراك"
          className="w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-orange-500"
          {...register("subscription_price", {
            required: "سعر الاشتراك مطلوب",
            valueAsNumber: true,
            min: {
              value: 1,
              message: "سعر الاشتراك يجب أن يكون أكبر من صفر",
            },
          })}
        />

        {errors.subscription_price && (
          <p className="text-sm text-red-600">
            {errors.subscription_price.message}
          </p>
        )}
      </div>

      {/* Start of Supscription */}
      <div className="space-y-2">
        <DatePickerInput
          name="subscription_start_date"
          control={control}
          label="تاريخ بداية الاشتراك"
          placeholder="اختر تاريخ البداية"
          rules={{
            required: "تاريخ بداية الاشتراك مطلوب",
          }}
        />
      </div>

      {/* End OF Subscription */}

      <div className="space-y-2">
        <DatePickerInput
          minDate={startDate}
          name="subscription_end_date"
          control={control}
          label="تاريخ نهاية الاشتراك"
          placeholder="اختر تاريخ النهاية"
          rules={{
            required: "تاريخ نهاية الاشتراك مطلوب",
            validate: (value) =>
              !startDate ||
              value >= startDate ||
              "يجب أن يكون تاريخ النهاية بعد تاريخ البداية",
          }}
        />
      </div>

      {/* paid or not */}

      <div className="space-y-2">
        <label className="block text-sm font-medium">المبلغ المدفوع</label>

        <input
          type="number"
          placeholder="المبلغ المدفوع"
          className={`${isEditSession && "cursor-no-drop"} w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-orange-500 `}
          disabled={isEditSession}
          {...register("paid_amount", {
            required: "المبلغ المدفوع!!",
            valueAsNumber: true,
            validate: (value) =>
              value <= subscriptionPrice ||
              "المبلغ المدفوع لا يمكن أن يكون أكبر من سعر الاشتراك",
          })}
        />

        {errors.paid_amount && (
          <p className="text-sm text-red-600">{errors.paid_amount.message}</p>
        )}
      </div>

      {/* if in edit */}
      {isEditSession && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          ⚠️ لا يمكن تعديل سعر الاشتراك أو المبلغ المدفوع من هنا، للحفاظ على
          السجل المالي. استخدم عمليات الدفع أو التجديد لتسجيل أي حركة مالية.
        </div>
      )}

      {/* feed back */}
      {remaining > 0 && (
        <p className="text-sm font-medium text-orange-600">
          المتبقي: {Math.max(remaining, 0)} جنيه
        </p>
      )}

      {/* الملاحظات */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">ملاحظات</label>

        <textarea
          rows={4}
          placeholder="اكتب أي ملاحظات..."
          className="w-full resize-none rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-orange-500"
          {...register("notes")}
        />
      </div>

      {/* الأزرار */}
      <div className="flex justify-end gap-3 border-t pt-5">
        <Button onClick={onClose} type={"button"} design="secondary">
          الغاء
        </Button>

        <Button type="submit">{isEditSession ? "حفظ التغيرات" : "حفظ"}</Button>
      </div>
    </form>
  );
}

export default MembersMainForm;
