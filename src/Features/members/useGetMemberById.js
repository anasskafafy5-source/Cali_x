import {  useQuery } from "@tanstack/react-query";
import { getMemberStatsById } from "../../services/apiMembers";

export function useGetMemberById(id) {
  const { data: memberData, isLoading , error } = useQuery({
    queryKey: ["memberData", id],
    queryFn: () => getMemberStatsById(id),
  });
  return {memberData ,isLoading , error}
}
