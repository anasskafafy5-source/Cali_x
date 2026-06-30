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
    onSuccess: (data) => {
      toast.success("تم الاضافه بي نجاح");
      queryClient.invalidateQueries({
        queryKey: ["captain-stats"],
      });
      queryClient.invalidateQueries({
        queryKey: ["members_view"],
      });
      queryClient.invalidateQueries({
        queryKey: ["captain-members", String(data.captain_id)],
      });
      console.log(data.captain_id);
    },
    onError: () => toast.error("هناك خطا اثناء الاضافه حاول مجددا"),
  });

  return { addMemberMutation, isPending, error };
}
