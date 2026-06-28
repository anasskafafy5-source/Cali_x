function Button({
  children,
  onClick,
  type,
  design = "primary",
  size = "normal",
}) {
  // 1. الكلاسات الثابتة اللي بتطبق على كل الزراير
  const baseStyles =
    "cursor-pointer rounded-2xl font-semibold duration-300 flex items-center gap-1";

  // 2. كلاسات الألوان بناءً على التصميم (الديناميكية)
  const designStyles = {
    primary: "bg-orange-500 text-stone-50 hover:bg-orange-700",
    secondary: "bg-stone-200 text-stone-900 hover:bg-stone-400",
    delete: "bg-red-500 text-stone-50 hover:bg-red-700",
    cold: "bg-blue-400 text-stone-50 hover:bg-blue-300", // ملحوظة: شلت text-shadow-stone-50 لأنه مش كلاس افتراضي في تيلويند إلا لو عامله تخصيص
  };

  // 3. كلاسات الأحجام
  const sizeStyles =
    size === "big"
      ? "text-[18px] sm:text-xl px-4 py-2"
      : "text-[15px] px-2 py-1.5";

  return (
    <button
      className={`${baseStyles} ${designStyles[design] || designStyles.primary} ${sizeStyles}`}
      onClick={onClick}
      type={type || "button"}
    >
      {children}
    </button>
  );
}

export default Button;
