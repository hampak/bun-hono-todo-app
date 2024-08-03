import { type ApiRoutes } from "@server/app";
import { queryOptions } from "@tanstack/react-query";
import { hc } from "hono/client";
// import { CreateListSchema } from "../../../server/sharedTypes"
import { CreateList } from "@server/sharedTypes"

const client = hc<ApiRoutes>("/");

export const api = client.api;

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

export async function createList({ value }: { value: CreateList }) {
  // const res = await api.todos.$post({
  //   json: value
  // })
  const res = await api.lists.$post({
    json: value
  })

  if (!res.ok) {
    throw new Error("server error")
  }

  const message = await res.json();
  return message
}