import { Hono } from "hono";
import { z } from "zod"
import { zValidator } from "@hono/zod-validator";

type Todos = {
  id: number,
  title: string,
  description: string
}


const todoSchema = z.object({
  id: z.number(),
  title: z.string().min(1).max(50),
  description: z.string().min(1).max(200)
})

type Todo = z.infer<typeof todoSchema>

const createTodoSchema = todoSchema.omit({ id: true })

const fakeTodos: Todos[] = [
  {
    id: 1,
    title: "Go to the shop",
    description: "Buy some apples"
  },
  {
    id: 2,
    title: "Go to the barber's shop",
    description: "Go bald"
  },
  {
    id: 3,
    title: "Hang out with friends",
    description: "Don't drink too much!"
  },
]

export const todosRoute = new Hono()
  .get("/", async (c) => {
    return c.json({
      todos: fakeTodos
    }, 200)
  })
  .post("/", zValidator("json", createTodoSchema), async (c) => {
    const data = await c.req.valid("json")
    fakeTodos.push({
      ...data,
      id: fakeTodos.length + 1
    })
    return c.json(data, 201)
  })
  // post specific page
  .get("/:id{[0-9]+}", async (c) => {
    const id = await c.req.param()
    return c.json({
      param: id
    }, 200)
  })
  .put("/:id{[0-9]+}", async (c) => {
    // need the todoId, title, and description values
    // store validated data to "data" variable" (+ use zValidator)
    // use drizzle to update the existing todo
    // return title of the post to use it in the toast message
  })
  .delete("/:id{[0-9]+}", async (c) => {
    // need the todoId value
    // delete the todo from db using drizzle
  })