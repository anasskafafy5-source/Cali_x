import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMember } from "../../services/apiMembers";
import toast from "react-hot-toast";


export function useUpdateMemberData() {
  const queryClient = useQueryClient();

  const { mutate: updateMemberMutation, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, memberData }) => updateMember(id, memberData),

    onSuccess: () => {
      toast.success("تم تحديث بيانات العضو بنجاح");
      queryClient.invalidateQueries({
        queryKey: ["members_view"],
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
