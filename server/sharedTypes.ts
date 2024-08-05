import * as z from "zod"

export const createListSchema = z.object({
  title: z.string().min(1, {
    message: "Please enter a name!"
  })
})

export const editListSchema = z.object({
  title: z.string().min(1, {
    message: "Please enter a name!"
  }),
  listId: z.number().min(1)
})

export type CreateList = z.infer<typeof createListSchema>
export type EditList = z.infer<typeof editListSchema>