import { ListContainer } from '@/components/todos/list-container'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/')({
  component: Index
})

function Index() {

  const fakeLists = [
    {
      id: 1,
      title: "first list",
      order: 1
    },
    {
      id: 2,
      title: "second list",
      order: 2
    }
  ]

  return (
    <div className="h-full bg-red-300s p-4 overflow-x-auto">
      <ListContainer lists={fakeLists} />
    </div>
  )
}