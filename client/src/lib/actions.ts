import { CreateList } from "@server/sharedTypes";
import { queryOptions } from "@tanstack/react-query";
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


export async function createListAction({ value }: { value: CreateList }) {
  const res = await api.lists.$post({
    json: value
  })

  if (!res.ok) {
    return new Error("server error")
  }

  const { message } = await res.json();
  return { message }
}

// export function useCreateList(disableEditing: { disableEditing: () => void }) {
//   const queryClient = useQueryClient()
//   return useMutation({
//     mutationKey: ["create-list"],
//     mutationFn: async ({ value }: { value: CreateList }) => {
//       const res = await api.lists.$post({
//         json: value
//       })

//       if (!res.ok) {
//         throw new Error("server error")
//       }

//       const { message } = await res.json();
//       return { message }
//     },
//     onSuccess: ({ message }) => {
//       toast.success(message)
//       queryClient.invalidateQueries()
//       disableEditing()
//     },
//     onError: ({ message }) => {
//       toast.error(message)
//     }
//   })
// }