import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index
})

function Index() {
  async function getAllTodos() {
    const res = await api.todos.$get()
    if (!res.ok) {
      throw new Error("server error")
    }
    const data = res.json()
    return data
  }

  const { data, isPending } = useQuery({
    queryKey: ["get-all-todos"],
    queryFn: getAllTodos
  })

  return (
    <div>
      {isPending ? "Loading..." :
        <>
          {data?.todos.map((todo, index) => (
            <div key={index}>
              {todo.title}
            </div>
          ))}
        </>
      }
      <Link
        to="/about"
      >
        About page
      </Link>
    </div>
  )
}