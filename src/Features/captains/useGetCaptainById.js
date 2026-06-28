import { useQuery } from "@tanstack/react-query";
import { getCaptainStatsById } from "../../services/apiCaptains";

export function useGetCaptainById(id) {
  const {
    data: captain,
    isPending,
    error,
  } = useQuery({
    queryKey: ["captain", id],
    queryFn: () => getCaptainStatsById(id),
    enabled: !!id,
  });

  return { captain, isPending, error };
}
