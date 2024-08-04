import { type ApiRoutes } from "@server/app";
import { hc } from "hono/client";
// import { CreateListSchema } from "../../../server/sharedTypes"

const client = hc<ApiRoutes>("/");

export const api = client.api;