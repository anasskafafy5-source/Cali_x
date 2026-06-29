import { useForm } from "react-hook-form";
import {
  FaPercent,
  FaMoneyBillWave,
  FaCalendarDays,
  FaDumbbell,
} from "react-icons/fa6";
import { useGetSettings } from "./useGetSettings";
import Spinner from "../../ui/Spinner";
import Error from "../../ui/Error";
import Button from "../../ui/Button";
import { useEffect } from "react";
import { useUpdateSettings } from "./useUpdateSettings";

function SettingsForm() {
  const { settings, isLoading, error } = useGetSettings();

  const { updateSettingsMutations, isPending } = useUpdateSettings();

  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      gym_name: "",
      percentage: 0,
      session_price: 0,
      expiring_soon_days: 0,
    },
  });

  useEffect(() => {
    if (settings) {
      reset(settings);
    }
  }, [settings, reset]);

  const percentage = Number(watch("percentage") || 0);

  function onSubmit(data) {
    updateSettingsMutations(data);
  }

  if (isLoading || isPending) return <Spinner />;
  if (error) return <Error />;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-1.5 mx-auto mt-4 max-w-4xl space-y-6 rounded-2xl bg-white p-6 shadow-sm"
    >
      {/* <div>
        <h2 className="text-xl font-bold text-slate-800">إعدادات الصالة</h2>

        <p className="mt-1 text-sm text-slate-500">
          يمكنك تعديل بيانات الصالة والإعدادات العامة من هنا.
        </p>
      </div> */}

      <div className="grid gap-5 md:grid-cols-2">
        {/* Gym Name */}

        <div className="space-y-2">
          <label className="flex items-center gap-2 font-medium text-slate-700">
            <FaDumbbell className="text-orange-500" />
            اسم الصالة
          </label>

          <input
            {...register("gym_name")}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 transition outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
            placeholder="مثال : Power Gym"
          />

          <p className="text-xs text-slate-500">
            الاسم الذي سيظهر داخل النظام.
          </p>
        </div>

        {/* Session Price */}

        <div className="space-y-2">
          <label className="flex items-center gap-2 font-medium text-slate-700">
            <FaMoneyBillWave className="text-orange-500" />
            سعر الحصة
          </label>

          <input
            type="number"
            {...register("session_price")}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 transition outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
          />

          <p className="text-xs text-slate-500">
            السعر الافتراضي للحصة الواحدة.
          </p>
        </div>

        {/* Expiring Soon */}

        <div className="space-y-2">
          <label className="flex items-center gap-2 font-medium text-slate-700">
            <FaCalendarDays className="text-orange-500" />
            قبل انتهاء الاشتراك
          </label>

          <input
            type="number"
            {...register("expiring_soon_days")}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 transition outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
          />

          <p className="text-xs text-slate-500">
            عدد الأيام التي يبدأ عندها ظهور تنبيه انتهاء الاشتراك.
          </p>
        </div>

        {/* Percentage */}

        <div className="space-y-2">
          <label className="flex items-center gap-2 font-medium text-slate-700">
            <FaPercent className="text-orange-500" />
            نسبة الصالة
          </label>

          <input
            type="number"
            min="0"
            max="100"
            {...register("percentage")}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 transition outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
          />

          <p className="text-xs text-slate-500">
            النسبة التي تحصل عليها الصالة من قيمة الحصة.
          </p>
        </div>
      </div>

      {/* Percentage Preview */}

      <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5">
        <h3 className="mb-4 font-semibold text-orange-700">توزيع قيمة الحصة</h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">نسبة الصالة</p>

            <h2 className="mt-1 text-3xl font-bold text-orange-600">
              {percentage}%
            </h2>
          </div>

          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">نسبة المدرب</p>

            <h2 className="mt-1 text-3xl font-bold text-emerald-600">
              {100 - percentage}%
            </h2>
          </div>
        </div>

        <p className="mt-4 text-sm text-slate-600">
          يتم احتساب نسبة المدرب تلقائياً بحيث يكون مجموع النسبتين 100%.
        </p>
      </div>

      <div className="flex justify-end">
        <Button type="submit">حفظ التغيرات </Button>
      </div>
    </form>
  );
}

export default SettingsForm;
