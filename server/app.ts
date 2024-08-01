import { Hono } from "hono";
import { logger } from "hono/logger";
import { todosRoute } from "./routes/todos";
import { serveStatic } from "hono/bun";

const app = new Hono()

app.use("*", logger())

app.route("/api/todos", todosRoute)

app.get("*", serveStatic({ root: "./client/dist" }))
app.get("*", serveStatic({ path: "./client/dist/index.html" }))


export default app;