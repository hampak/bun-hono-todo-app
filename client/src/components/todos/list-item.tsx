import { List } from "./list-container"

interface ListItemProps {
  list: List
}

export const ListItem = ({ list }: ListItemProps) => {

  return (
    <li className="bg-green-300 w-[272px] select-none list-none">
      <div className="w-full rounded-md g-[#f1f2f4] shadow-md pb-2">
        {/* <ListHeader /> */}
        <div className="space-y-1 px-1">
        </div>
      </div>
    </li >
  )
}