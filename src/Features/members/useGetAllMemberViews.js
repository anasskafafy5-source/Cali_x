import { useQuery } from "@tanstack/react-query";
import { getAllMembersView } from "../../services/apiMembers";

export function useGetAllMemberViews() {
  const {
    data: membersViews,
    isPending,
    error,
  } = useQuery({
    queryKey: ["members_view"],
    queryFn: getAllMembersView,
    staleTime: 1000 * 60 * 5, // 5 دقائق
  });

  const members_count = membersViews?.length;

  return { membersViews, isPending, error, members_count };
}
