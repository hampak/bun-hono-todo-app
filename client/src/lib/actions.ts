import { CreateList, EditList } from "@server/sharedTypes";
import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "./api";

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


// create list
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

// get all list of specific user
export function useGetLists() {
  return useQuery({
    queryKey: ["get-list"],
    queryFn: async () => {
      const res = await api.lists.$get()

      if (!res.ok) {
        throw new Error("Server error")
      }

      const { lists } = await res.json()

      const allLists = lists.map(list => ({
        ...list,
        createdAt: list.createdAt ? new Date(list.createdAt) : null
      }))

      return {
        allLists
      }
    }
  })
}

// update list title of specific list
export function useEditList() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["edit-list"],
    mutationFn: async ({ value }: { value: EditList }) => {
      const res = await api.lists.$put({
        json: value
      })

      if (!res.ok) {
        throw new Error("server error")
      }

      const { message } = await res.json();
      return {
        message
      }
    },
    onSuccess: ({ message }) => {
      toast.success(message)
      queryClient.invalidateQueries()
    },
  })
}