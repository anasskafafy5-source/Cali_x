import Button from "./Button";

function ConfirmModal({
  title = "تأكيد العملية",
  message = "هل أنت متأكد من تنفيذ هذه العملية؟",
  confirmText = "تأكيد",
  cancelText = "إلغاء",
  isLoading = false,
  onConfirm,
  onClose,
}) {
  return (
    <div className="p-6">
      <h2 className="mb-3 text-xl font-semibold">{title}</h2>

      <p className="mb-6 text-gray-600">{message}</p>

      <div className="flex justify-end gap-3">
        <Button design="secondary" onClick={onClose} disabled={isLoading}>
          {cancelText}
        </Button>

        <Button design="delete" onClick={onConfirm} disabled={isLoading}>
          {isLoading ? "جارٍ الحذف..." : confirmText}
        </Button>
      </div>
    </div>
  );
}

export default ConfirmModal;
