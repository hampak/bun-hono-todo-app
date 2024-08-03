import { Hono } from "hono";
import { z } from "zod"
import { zValidator } from "@hono/zod-validator";
import { createListSchema } from "../sharedTypes";
import { db } from "../db";
import { lists } from "../db/schema/lists";
import { getUser } from "../kinde"

export const listsRoute = new Hono()
  .get("/", async (c) => {
    return c.json({
      lists: [
        {
          id: 1,
          title: "something"
        }
      ]
    })
  })

  // create new list
  .post("/", getUser, zValidator("json", createListSchema), async (c) => {
    const user = c.var.user
    const data = await c.req.valid("json")
    console.log(user.id)
    try {
      await db.insert(lists).values({
        title: data.title,
        userId: user.id
      })
      return c.json({
        message: `Created List - ${data.title}`
      }, 201)
    } catch (error) {
      return c.json({
        message: "Failed to create list"
      }, 500)
    }
  })