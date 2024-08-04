import { ListContainer } from '@/components/todos/list-container'
import { useGetLists } from '@/lib/actions'
import { createFileRoute } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'

export const Route = createFileRoute('/_authenticated/')({
  component: Index
})

function Index() {

  const { data, isPending } = useGetLists()

  console.log(data)

  return (
    <div className="h-full bg-red-300s p-4 overflow-x-auto">
      {
        isPending ? (
          <Loader2 className="w-6 h-6 animate-spin" />
        ) : (
          <ListContainer lists={data?.allLists} />
        )
      }
    </div>
  )
}