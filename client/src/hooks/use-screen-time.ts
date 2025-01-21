import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ScreenTimeSession } from "@db/schema";

export function useScreenTime(startDate: Date, endDate: Date) {
  const queryClient = useQueryClient();

  const { data: sessions, isLoading } = useQuery<ScreenTimeSession[]>({
    queryKey: [
      "/api/screen-time",
      startDate.toISOString(),
      endDate.toISOString(),
    ],
  });

  const addSession = useMutation({
    mutationFn: async (minutes: number) => {
      const res = await fetch("/api/screen-time", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ minutes }),
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/api/screen-time"],
      });
    },
  });

  return {
    sessions,
    isLoading,
    addSession: addSession.mutateAsync,
  };
}
