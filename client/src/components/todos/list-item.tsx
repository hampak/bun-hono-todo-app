import { Lists } from "@server/db/schema/schema"
import { ListHeader } from "./list-header"
import { Separator } from "../ui/separator"

interface ListItemProps {
  list: Lists
}

export const ListItem = ({ list }: ListItemProps) => {

  return (
    <li className="bg-green-300s w-[272px] select-none list-none">
      <div className="w-full rounded-md g-[#f1f2f4] shadow-md p-2">
        <ListHeader title={list.title} listId={list.id} />
        <Separator />
        <div className="space-y-1 px-1">
        </div>
      </div>
    </li >
  )
}