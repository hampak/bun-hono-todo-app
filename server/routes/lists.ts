import { Hono } from "hono";
import { z } from "zod"
import { zValidator } from "@hono/zod-validator";
import { createListSchema, editListSchema } from "../sharedTypes";
import { db } from "../db";
import { lists } from "../db/schema/lists";
import { getUser } from "../kinde"
import { asc, eq } from "drizzle-orm";

export const listsRoute = new Hono()
  // fetch all list of a certain user
  .get("/", getUser, async (c) => {
    const user = c.var.user
    try {
      const data = await db.select().from(lists)
        .where(
          eq(lists.userId, user.id)
        )
        .orderBy(asc(lists.createdAt)) || []

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

  .put("/", getUser, zValidator("json", editListSchema), async (c) => {
    const data = await c.req.valid("json")
    try {
      const listIdNumber = Number(data.listId)
      const updatedTitle = await db.update(lists)
        .set({
          title: data.title
        })
        .where(eq(lists.id, listIdNumber))
        .returning({
          updatedTitle: lists.title
        })
      return c.json({
        message: `Updated list name to ${updatedTitle[0].updatedTitle}`,
      }, 200)
    } catch (error) {
      return c.json({
        message: "Failed to update list title"
      }, 500)
    }
  })