import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMember } from "../../services/apiMembers";
import toast from "react-hot-toast";

export function useUpdateMemberData() {
  const queryClient = useQueryClient();

  const { mutate: updateMemberMutation, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, memberData }) => updateMember(id, memberData),

    onSuccess: (data) => {
      toast.success("تم تحديث بيانات العضو بنجاح");
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
    updateMember: updateMemberMutation,
    isUpdating,
  };
}
