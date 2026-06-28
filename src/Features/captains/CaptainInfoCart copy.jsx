import {
  FaPhoneAlt,
  FaUsers,
  FaMoneyBillWave,
  FaHandHoldingUsd,
  FaWarehouse,
} from "react-icons/fa";
import { CiEdit } from "react-icons/ci";

import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CaptainForm from "./CaptainForm";
import { useState } from "react";

function CaptainInfoCart({ captain }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-8 border-b border-gray-100 pb-5">
        <h2 className="flex items-center justify-between text-2xl font-bold text-gray-800">
          <p> {captain.full_name}</p>{" "}
          <p className="text-2xl font-bold text-orange-500">#{captain.id}</p>
        </h2>

        <div className="mt-2 mb-3 flex items-center gap-2 text-gray-500">
          <FaPhoneAlt className="text-orange-500" />
          <span>{captain.phone}</span>
        </div>
        {/* Start Edit on Captain */}
        <Button onClick={() => setIsOpen(true)}>
          <span>
            <CiEdit />
          </span>{" "}
          تعديل معلومات عن الكابتن
        </Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <CaptainForm captain={captain} />
        </Modal>
        {/* End Edit on Captain */}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Members */}
        <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5 transition hover:-translate-y-1 hover:shadow-md">
          <div className="mb-4 flex items-center justify-between">
            <FaUsers className="text-3xl text-blue-600" />
            <span className="text-xs font-medium text-blue-600">الأعضاء</span>
          </div>

          <h3 className="text-3xl font-bold text-gray-800">
            {captain.members_count}
          </h3>
        </div>

        {/* Revenue */}
        <div className="rounded-2xl border border-green-100 bg-green-50/70 p-5 transition hover:-translate-y-1 hover:shadow-md">
          <div className="mb-4 flex items-center justify-between">
            <FaMoneyBillWave className="text-3xl text-green-600" />
            <span className="text-xs font-medium text-green-600">
              الإيرادات
            </span>
          </div>

          <h3 className="text-3xl font-bold text-gray-800">
            {captain.total_revenue} ج.م
          </h3>
        </div>

        {/* Captain Share */}
        <div className="rounded-2xl border border-orange-100 bg-orange-50/70 p-5 transition hover:-translate-y-1 hover:shadow-md">
          <div className="mb-4 flex items-center justify-between">
            <FaHandHoldingUsd className="text-3xl text-orange-600" />
            <span className="text-xs font-medium text-orange-600">
              نصيب المدرب
            </span>
          </div>

          <h3 className="text-3xl font-bold text-gray-800">
            {captain.captain_share} ج.م
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            ({captain.captain_percentage}%)
          </p>
        </div>

        {/* Gym Share */}
        <div className="rounded-2xl border border-purple-100 bg-purple-50/70 p-5 transition hover:-translate-y-1 hover:shadow-md">
          <div className="mb-4 flex items-center justify-between">
            <FaWarehouse className="text-3xl text-purple-600" />
            <span className="text-xs font-medium text-purple-600">
              نصيب الصالة
            </span>
          </div>

          <h3 className="text-3xl font-bold text-gray-800">
            {captain.gym_share} ج.م
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            ({captain.gym_percentage}%)
          </p>
        </div>
      </div>
    </div>
  );
}

export default CaptainInfoCart;
