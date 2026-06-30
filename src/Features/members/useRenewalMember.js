import { useMutation, useQueryClient } from "@tanstack/react-query";
import { renewMember } from "../../services/apiMembers";
import toast from "react-hot-toast";

export function useRenewalMember() {
  const queryClient = useQueryClient();

  const { mutate: renewalMutation, isPending } = useMutation({
    mutationFn: ({ id, memberData, amountPaid }) =>
      renewMember(id, memberData, amountPaid),

    onSuccess: (data) => {
      toast.success("تم تجديد اشتراك الاعب بي نجاح");
      queryClient.invalidateQueries({
        queryKey: ["members_view"],
      });
      queryClient.invalidateQueries({
        queryKey: ["memberData", Number(data.id)],
      });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    renewalMutation,
    isPending,
  };
}
