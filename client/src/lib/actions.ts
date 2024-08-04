import { CreateList } from "@server/sharedTypes";
import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";
import { toast } from "sonner";

async function getCurrentUser() {
  const res = await api.me.$get();
  if (!res.ok) {
    throw new Error("server error");
  }
  const data = await res.json();
  return data;
}

export const userQueryOptions = queryOptions({
  queryKey: ["get-current-user"],
  queryFn: getCurrentUser,
  staleTime: Infinity,
});

export function useCreateList(options: {
  disableEditing?: () => void;
  onSuccess?: () => void;
  onError?: () => void
}) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["create-list"],
    mutationFn: async ({ value }: { value: CreateList }) => {
      const res = await api.lists.$post({
        json: value
      })

      if (!res.ok) {
        throw new Error("server error")
      }

      const { message } = await res.json();
      return { message }
    },
    onSuccess: ({ message }) => {
      toast.success(message)
      queryClient.invalidateQueries()
      if (options.disableEditing) {
        options.disableEditing()
      }
    },
    onError: ({ message }) => {
      toast.error(message)
    }
  })
}