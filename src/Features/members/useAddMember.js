import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMember } from "../../services/apiMembers";
import toast from "react-hot-toast";

export function useAddMember() {
  const queryClient = useQueryClient();
  const {
    mutate: addMemberMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: (newMember) => createMember(newMember),
    onSuccess: () => {
      toast.success("تم الاضافه بي نجاح");
      queryClient.invalidateQueries({
        queryKey: ["captain-stats"],
      });
      queryClient.invalidateQueries({
        queryKey: ["members_view"],
      });
    },
    onError: () => toast.error("هناك خطا اثناء الاضافه حاول مجددا"),
  });

  return { addMemberMutation, isPending, error };
}
