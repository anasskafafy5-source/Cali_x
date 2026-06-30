import { useMutation, useQueryClient } from "@tanstack/react-query";
import { payMember } from "../../services/apiMembers";
import toast from "react-hot-toast";

export function usePayBackMember() {
  const queryClient = useQueryClient();

  const { mutate: paybackMutation, isPending } = useMutation({
    mutationFn: ({ id, memberData, amountPaid }) =>
      payMember(id, memberData, amountPaid),

    onSuccess: (data) => {
      toast.success("تم سداد المبلغ بي نجاح");
      queryClient.invalidateQueries({
        queryKey: ["members_view"],
      });
      queryClient.invalidateQueries({
        queryKey: ["memberData", Number(data.id)],
      });
      queryClient.invalidateQueries({
        queryKey: ["captain-members", String(data.captain_id)],
      });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    paybackMutation,
    isPending,
  };
}
