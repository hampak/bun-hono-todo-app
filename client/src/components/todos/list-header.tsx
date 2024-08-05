import { ElementRef, useEffect, useRef, useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { useForm } from "react-hook-form"
import { EditList, editListSchema } from "@server/sharedTypes"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useEditList } from "@/lib/actions"

interface ListHeaderProps {
  title: string
  listId: number
}

export const ListHeader = ({ title, listId }: ListHeaderProps) => {

  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef<ElementRef<"input">>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null);

  const form = useForm<z.infer<typeof editListSchema>>({
    resolver: zodResolver(editListSchema),
    defaultValues: {
      title,
      listId
    }
  })

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    })
  }

  const disableEditing = () => {
    setIsEditing(false)
  }

  const handleClickOutside = (e: MouseEvent) => {
    if (
      formRef.current &&
      !formRef.current.contains(e.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(e.target as Node)
    ) {
      disableEditing()
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  })

  const { mutate: editList, isPending } = useEditList({ form })

  const handleSubmit = async (value: EditList) => {
    editList({ value })
  }

  return (
    <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-center gap-x-2 mb-4">
      <div className="flex-1">
        {
          isEditing ? (
            <div className="flex flex-col space-y-2">
              <Form {...form}>
                <form
                  className="space-y-2"
                  ref={formRef}
                  onSubmit={form.handleSubmit(handleSubmit)}
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <>
                            {/* <input
                              hidden
                              id="title"
                              name="title"
                            /> */}
                            <Input
                              // defaultValue={title}
                              {...field}
                              placeholder="change the name"
                              ref={inputRef}
                              disabled={isPending}
                            />
                          </>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex space-x-1">
                    <Button
                      ref={buttonRef}
                      className="w-full"
                      size="xs"
                      type="submit"
                    >
                      Save
                    </Button>
                    <Button
                      className="text-white transition-all w-full text-sm"
                      // disabled={isPending}
                      variant="destructive"
                      size="xs"
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation()
                        disableEditing()
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          ) : (
            <p
              className="w-full cursor-pointer"
              onClick={enableEditing}
            >
              {title}
            </p>
          )
        }
      </div>
    </div>
  )
}