import { Hono } from "hono";
import { logger } from "hono/logger";
import { todosRoute } from "./routes/todos";

const app = new Hono()

app.use("*", logger())

app.get("/", (c) => c.text("Hello bun"))

app.route("/api/todos", todosRoute)


export default app;