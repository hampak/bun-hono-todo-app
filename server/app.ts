import { Hono } from "hono";
import { logger } from "hono/logger";
import { todosRoute } from "./routes/todos";
import { serveStatic } from "hono/bun";
import { authRoute } from "./routes/auth";
import { listsRoute } from "./routes/lists";
// import { extendSession } from "./kinde";

const app = new Hono()

app.use("*", logger())
// app.use("*", extendSession)

const apiRoutes = app.basePath("/api")
  .route("/todos", todosRoute)
  .route("/lists", listsRoute)
  .route("/", authRoute)

app.get("*", serveStatic({ root: "./client/dist" }))
app.get("*", serveStatic({ path: "./client/dist/index.html" }))


export default app;
export type ApiRoutes = typeof apiRoutes // exporting types using hono rpc