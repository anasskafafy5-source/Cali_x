import { useForm } from "react-hook-form";
import {
  FaMoneyBillWave,
  FaNoteSticky,
  FaArrowTrendUp,
  FaArrowTrendDown,
} from "react-icons/fa6";
import { useAddNewTransaction } from "./useAddNewTransaction";
import Spinner from "../../ui/Spinner";
import { formatDateForDB } from "../../utils/helpers";

function TransactionForm({ onClose }) {
  const { addNewTransactionMutation, isPending: isLoading } =
    useAddNewTransaction();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      direction: "expense",
      amount_paid: "",
      notes: "",
    },
  });

  const direction = watch("direction");

  function handleForm(data) {
    const newTransaction = {
      member_id: null,
      captain_id: null,

      type_transaction: "manual",

      direction: data.direction, // income | expense

      amount_paid: Number(data.amount_paid),

      notes: data.notes.trim(),

      paid_at: formatDateForDB(new Date()),
    };

    addNewTransactionMutation(newTransaction, {
      onSettled: () => onClose?.(),
    });
  }

  if (isLoading) return <Spinner />;
  return (
    <form
      onSubmit={handleSubmit(handleForm)}
      className="space-y-6 rounded-2xl bg-white p-6 shadow-lg"
    >
      <h2 className="text-center text-2xl font-bold text-slate-800">
        تسجيل عملية مالية
      </h2>

      {/* اتجاه العملية */}

      <div>
        <label className="mb-3 block font-semibold text-slate-700">
          نوع العملية
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Income */}

          <label
            className={`cursor-pointer rounded-xl border p-5 transition ${
              direction === "income"
                ? "border-green-500 bg-green-50"
                : "border-slate-200 hover:border-green-300"
            }`}
          >
            <input
              hidden
              type="radio"
              value="income"
              {...register("direction")}
            />

            <div className="flex items-start gap-4">
              <FaArrowTrendUp className="mt-1 text-2xl text-green-600" />

              <div>
                <h3 className="font-bold text-green-600">إيراد</h3>

                <p className="mt-1 text-sm text-slate-500">
                  أي مبلغ دخل إلى الصالة مثل بيع منتج أو أي دخل إضافي.
                </p>
              </div>
            </div>
          </label>

          {/* Expense */}

          <label
            className={`cursor-pointer rounded-xl border p-5 transition ${
              direction === "expense"
                ? "border-red-500 bg-red-50"
                : "border-slate-200 hover:border-red-300"
            }`}
          >
            <input
              hidden
              type="radio"
              value="expense"
              {...register("direction")}
            />

            <div className="flex items-start gap-4">
              <FaArrowTrendDown className="mt-1 text-2xl text-red-600" />

              <div>
                <h3 className="font-bold text-red-600">مصروف</h3>

                <p className="mt-1 text-sm text-slate-500">
                  أي مبلغ خرج من الصالة مثل المرتبات أو الإيجار أو الكهرباء أو
                  الصيانة أو شراء الأدوات.
                </p>
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* Amount */}

      <div>
        <label className="mb-2 block font-semibold text-slate-700">
          المبلغ
        </label>

        <div className="relative">
          <FaMoneyBillWave className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />

          <input
            type="number"
            placeholder="أدخل قيمة المبلغ"
            {...register("amount_paid", {
              required: "يرجى إدخال المبلغ",
              min: {
                value: 1,
                message: "المبلغ يجب أن يكون أكبر من صفر",
              },
            })}
            className="w-full rounded-xl border border-slate-300 py-3 pr-4 pl-11 transition outline-none focus:border-blue-500"
          />
        </div>

        {errors.amount_paid && (
          <p className="mt-1 text-sm text-red-500">
            {errors.amount_paid.message}
          </p>
        )}
      </div>

      {/* السبب */}

      <div>
        <label className="mb-2 block font-semibold text-slate-700">
          سبب العملية
        </label>

        <div className="relative">
          <FaNoteSticky className="absolute top-3 left-4 text-slate-400" />

          <input
            type="text"
            placeholder="مثال: بيع مياه أو كهرباء"
            {...register("notes", {
              required: "يرجى كتابة سبب العملية",
              validate: (value) =>
                value.trim().split(/\s+/).length <= 2 || "يسمح بكلمتين فقط",
            })}
            className="w-full rounded-xl border border-slate-300 py-3 pr-4 pl-11 transition outline-none focus:border-blue-500"
          />
        </div>

        <p className="mt-2 text-xs text-slate-500">
          اكتب سببًا مختصرًا يوضح طبيعة العملية (بحد أقصى كلمتين).
        </p>

        {errors.notes && (
          <p className="mt-1 text-sm text-red-500">{errors.notes.message}</p>
        )}
      </div>

      {/* Preview */}

      <div
        className={`rounded-xl border p-4 ${
          direction === "income"
            ? "border-green-300 bg-green-50"
            : "border-red-300 bg-red-50"
        }`}
      >
        <p className="font-semibold">
          {direction === "income"
            ? "📈 سيتم تسجيل العملية كإيراد."
            : "📉 سيتم تسجيل العملية كمصروف."}
        </p>

        <p className="mt-2 text-sm text-slate-600">
          سيتم حفظ تاريخ ووقت العملية تلقائيًا عند الضغط على زر الحفظ.
        </p>
      </div>

      {/* Submit */}

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full rounded-xl py-3 font-semibold text-white transition ${
          direction === "income"
            ? "bg-green-600 hover:bg-green-700"
            : "bg-red-600 hover:bg-red-700"
        } disabled:cursor-not-allowed disabled:opacity-60`}
      >
        {isLoading ? "جارٍ الحفظ..." : "حفظ العملية"}
      </button>
    </form>
  );
}

export default TransactionForm;
