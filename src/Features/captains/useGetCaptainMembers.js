import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCaptainMembers } from "../../services/apiCaptains";
import { PAGE_SIZE_CAPTAINS_MEMBERS } from "../../utils/constance";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export function useGetCaptainMembers(id) {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  //[1] pagination
  const page = Number(searchParams.get("page")) || 1;

  const {
    data: { data: captainMembers, count: captainMembersCount } = {},
    isPending,
    error,
  } = useQuery({
    queryKey: ["captain-members", id, page],
    queryFn: () => getCaptainMembers(id, page, PAGE_SIZE_CAPTAINS_MEMBERS),
    staleTime: 1000 * 60 * 5,
  });

  const pageCount = Math.ceil(
    (captainMembersCount || 0) / PAGE_SIZE_CAPTAINS_MEMBERS,
  );



  //prefetch

  useEffect(() => {
    if (page >= pageCount) return;

    queryClient.prefetchQuery({
      queryKey: ["captain-members", id, page + 1],
      queryFn: () =>
        getCaptainMembers(id, page + 1, PAGE_SIZE_CAPTAINS_MEMBERS),
      staleTime: 1000 * 60,
    });
  }, [page, pageCount, id, queryClient]);

  return {
    captainMembers,
    captainMembersCount,
    isPending,
    error,
  };
}
