import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCaptain } from "../../services/apiCaptains";
import toast from "react-hot-toast";

export function useAddCaptain() {
  const queryClient = useQueryClient();

  const {
    mutate: addNewCaptainMutation,
    isPending: isAdding,
    error,
  } = useMutation({
    mutationFn: (newCaptain) => createCaptain(newCaptain),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["captain-stats"],
      });
      toast.success("تم اضافه الكابتن بي نجاح");
    },
    onError: () => toast.error("حدث خطأ أثناء الإضافة"),
  });

  return { addNewCaptainMutation, isAdding, error };
}
