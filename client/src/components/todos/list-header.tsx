import { ElementRef, useEffect, useRef, useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

interface ListHeaderProps {
  title: string
}

export const ListHeader = ({ title }: ListHeaderProps) => {

  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef<ElementRef<"input">>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null);


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

  return (
    <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-center gap-x-2 mb-4">
      <div className="flex-1">
        {
          isEditing ? (
            <div className="flex flex-col space-y-2">
              <form
                className=""
                ref={formRef}
              >
                <input
                  hidden
                  id="id"
                  name="id"
                />
                <Input
                  defaultValue={title}
                  placeholder="change the name"
                  ref={inputRef}
                />
              </form>
              <Button
                ref={buttonRef}
                className="w-full"
                size="xs"
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                }}
              >
                Save
              </Button>
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