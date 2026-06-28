import { FaPhoneAlt, FaUsers, FaMoneyBillWave, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function CaptainBox({ captain }) {
  const navigate = useNavigate();

  function handleViewDetails(id) {
    navigate(`/captains/${id}`);
  }

  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Header */}
      <div className="mb-6">
        <h3 className="flex items-center justify-between text-[18px] font-bold text-gray-800">
          <div>{captain.full_name}</div>{" "}
          <p className="text-[17px] font-bold text-orange-500">
            {"  "}
            {captain.id}#
          </p>
        </h3>

        <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
          <FaPhoneAlt className="text-orange-500" />
          <span>{captain.phone}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        {/* Members */}
        <div className="rounded-xl bg-blue-500/10 p-4">
          <div className="mb-2 flex items-center gap-2">
            <FaUsers className="text-blue-600" />
            <span className="text-sm font-medium text-blue-700">الأعضاء</span>
          </div>

          <p className="text-2xl font-bold text-blue-700">
            {captain.members_count ?? 0}
          </p>
        </div>

        {/* Revenue */}
        <div className="rounded-xl bg-orange-500/10 p-4">
          <div className="mb-2 flex items-center gap-2">
            <FaMoneyBillWave className="text-orange-500" />
            <span className="text-sm font-medium text-orange-600">
              اجمالي الإيرادات
            </span>
          </div>

          <p className="text-2xl font-bold text-orange-600">
            {captain.total_revenue ?? 0} ج
          </p>
        </div>
      </div>

      {/* Footer */}
      <button
        className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-orange-200 py-3 font-medium text-orange-600 transition-all duration-300 hover:bg-orange-500 hover:text-white"
        onClick={() => handleViewDetails(captain.id)}
      >
        <FaEye />
        <span>عرض تفاصيل المدرب</span>
      </button>
    </div>
  );
}

export default CaptainBox;
