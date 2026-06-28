import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import { useAddCaptain } from "./useAddCaptain";
import Spinner from "../../ui/Spinner";

function CaptainForm({ onClose }) {
  const { addNewCaptainMutation, isAdding} = useAddCaptain();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    const newCaptain = { ...data };
    addNewCaptainMutation(newCaptain);
    onClose?.();
  }

  if (isAdding) return <Spinner />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-6">
      <h2 className="text-2xl font-bold">إضافة مدرب</h2>

      {/* الاسم */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">الاسم</label>

        <input
          type="text"
          placeholder="اسم المدرب"
          className="w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-orange-500"
          {...register("full_name", {
            required: "الاسم مطلوب",
          })}
        />

        {errors.full_name && (
          <p className="text-sm text-red-600">{errors.full_name.message}</p>
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
            required: "رقم الهاتف مطلوب",
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
          })}
        />

        {errors.subscription_price && (
          <p className="text-sm text-red-600">
            {errors.subscription_price.message}
          </p>
        )}
      </div>

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

        <Button type="submit">حفظ</Button>
      </div>
    </form>
  );
}

export default CaptainForm;
