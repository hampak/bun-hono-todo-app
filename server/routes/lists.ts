import { Hono } from "hono";
import { z } from "zod"
import { zValidator } from "@hono/zod-validator";
import { createListSchema } from "../sharedTypes";
import { db } from "../db";
import { lists } from "../db/schema/lists";
import { getUser } from "../kinde"
import { eq } from "drizzle-orm";

export const listsRoute = new Hono()
  // fetch all list of a certain user
  .get("/", getUser, async (c) => {
    const user = c.var.user
    try {
      const data = await db.select().from(lists)
        .where(
          eq(lists.userId, user.id)
        ) || []

      const allLists = data.map(list => ({
        ...list,
        createdAt: list.createdAt ? list.createdAt.toISOString() : null
      }))

      return c.json({
        lists: allLists
      }, 200)
    } catch (error) {
      return c.json({
        message: "Failed to retrieve your lists :("
      }, 401)
    }
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