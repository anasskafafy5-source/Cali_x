import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteMember } from "../../services/apiMembers";

export function useDeleteMember() {
  const queryClient = useQueryClient();

  const { mutate: removeMemberMutation, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deleteMember(id),

    onSuccess: (data) => {
      toast.success("تم الحذف بي نجاح");
      //   queryClient.invalidateQueries({ queryKey: ["members"] });
      queryClient.invalidateQueries({ queryKey: ["members_view"] });
      queryClient.invalidateQueries({
        queryKey: ["captain-members", String(data.captain_id)],
      });
    },

    onError: () => {
      toast.error("حدث خطأ لا يمكن الحذف الان");
    },
  });

  return { removeMemberMutation, isDeleting };
}
