import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useGetSettings() {
  const {
    data: settings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
    staleTime: 1000 * 60 * 5,
  });
  return { settings, isLoading, error };
}
