import { useCreateList } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useEventListener } from "usehooks-ts";
import { z } from "zod";
import { CreateList, createListSchema } from "../../../../server/sharedTypes";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";


export const CreateListForm = () => {

  const [isEditing, setIsEditing] = useState(false)
  const formRef = useRef<ElementRef<"form">>(null)
  const inputRef = useRef<ElementRef<"input">>(null)

  const form = useForm<z.infer<typeof createListSchema>>({
    resolver: zodResolver(createListSchema),
    defaultValues: {
      title: ""
    }
  })

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
    })
  }

  const disableEditing = () => {
    setIsEditing(false)
    form.reset()
  }


  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      disableEditing()
    }
  }

  const { mutate: createList, isPending } = useCreateList({
    disableEditing: () => {
      setIsEditing(false)
      form.reset()
    }
  })

  const handleSubmit = async (value: CreateList) => {
    createList({ value })
  }

  useEventListener("keydown", onKeyDown)

  return (
    <div
      className={cn("w-60 py-2 flex justify-center items-center rounded-lg cursor-pointer transition-all select-none shrink-0 bg-gray-100 hover:bg-gray-100/50 h-max")}
      onClick={enableEditing}
    >
      {
        isEditing ? (
          <div className="w-full h-full flex items-center px-1 shrink-0">
            <Form {...form}>
              <form
                className="w-full flex items-center relative"
                onSubmit={form.handleSubmit(handleSubmit)}
                ref={formRef}
              // onBlur={disableEditing}
              >
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <>
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="name for new list"
                              className="pr-8"
                              disabled={isPending}
                              ref={inputRef}
                            // onBlur={disableEditing}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  />
                </div>
                <button
                  className="absolute right-2 top-2.5 text-black hover:text-gray-500 transition-all"
                  type="submit"
                // disabled={isLoading}
                >
                  {
                    isPending ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Plus className="w-5 h-5" />
                    )
                  }
                </button>
              </form>
            </Form>
          </div>
        ) : (
          <div className="w-full flex items-center justify-between space-x-2 px-3">
            <span>Create New List</span>
          </div>
        )

      }
    </div>
  )
}
