import { useQuery } from "@tanstack/react-query";
import { getCaptainStats } from "../../services/apiCaptains";

export function useCaptainStats() {
  const {
    data: captainStats,
    isPending,
    error,
  } = useQuery({
    queryKey: ["captain-stats"],
    queryFn: getCaptainStats,
    staleTime: 1000 * 60 * 5, // 5 دقائق
  });

  const captainsCount = captainStats?.length;

  return {
    captainStats,
    captainsCount,
    isPending,
    error,
  };
}
