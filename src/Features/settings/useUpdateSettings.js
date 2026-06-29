import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSettings } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  const {
    mutate: updateSettingsMutations,
    isPending,
    error,
  } = useMutation({
    mutationFn: (updatedData) => updateSettings(updatedData),
    onSuccess: () => {
      toast.success("تم تغيير الاعدادات بي نجاح");
      queryClient.invalidateQueries(["settings"]);
    },
    onError: () => toast.error("لا يمكن تحديث البيانات الان هناك خطأ"),
  });
  return { updateSettingsMutations, isPending, error };
}
