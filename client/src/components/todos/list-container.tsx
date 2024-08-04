import { Lists } from "@server/db/schema/schema";
import { CreateListForm } from "./create-list-form";
import { ListItem } from "./list-item";

interface ListContainerProps {
  lists?: Lists[]
}

export const ListContainer = ({ lists }: ListContainerProps) => {

  return (
    <div className="shrink-0 h-full gap-x-3 flex">
      {
        lists?.length === 0 ? "" : (
          lists?.map((list, index) => (
            <div key={index}>
              <ListItem list={list} />
            </div>
          ))
        )
      }
      <CreateListForm />
      <div className="flex-shrink-0 w-1" />
    </div>
  )
}