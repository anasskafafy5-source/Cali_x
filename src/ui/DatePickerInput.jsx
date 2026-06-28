import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { FaRegCalendarAlt } from "react-icons/fa";

import "react-datepicker/dist/react-datepicker.css";

function DatePickerInput({
  name,
  control,
  label,
  rules,
  placeholder = "اختر التاريخ",
  minDate,
  maxDate,
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <>
            <div className="relative">
              <DatePicker
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                onBlur={field.onBlur}
                placeholderText={placeholder}
                dateFormat="dd/MM/yyyy"
                minDate={minDate}
                maxDate={maxDate}
                className={`w-full rounded-xl border bg-white py-3 pr-12 pl-4 text-sm transition-all duration-200 outline-none ${
                  error
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-orange-500"
                }`}
              />

              <FaRegCalendarAlt className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-orange-500" />
            </div>

            {error && (
              <p className="mt-1 text-xs text-red-500">{error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
}

export default DatePickerInput;
