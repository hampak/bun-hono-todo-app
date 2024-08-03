import * as z from "zod"

export const createListSchema = z.object({
  title: z.string().min(1, {
    message: "Please enter a name!"
  })
})

export type CreateList = z.infer<typeof createListSchema>