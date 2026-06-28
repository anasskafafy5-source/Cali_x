import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCaptain } from "../../services/apiCaptains";
import toast from "react-hot-toast";

export function useUpdateCaptain() {
  const queryClient = useQueryClient();

  const {
    mutate: updateCaptainMutation,
    isPending: isUpdating,
    error,
  } = useMutation({
    mutationFn: ({ id, updatedCaptain }) => updateCaptain(id, updatedCaptain),

    onSuccess: (data) => {
      toast.success("تم تحديث بيانات المدرب بنجاح");
      queryClient.invalidateQueries({
        queryKey: ["captain-stats"],
      });
      queryClient.invalidateQueries({
        queryKey: ["captain", String(data.id)],
      });
    },

    onError: () => {
      toast.error("حدث خطأ أثناء تحديث بيانات المدرب");
    },
  });

  return {
    updateCaptainMutation,
    isUpdating,
    error,
  };
}
