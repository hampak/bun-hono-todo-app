import { userQueryOptions } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/about')({
  component: About
})
function About() {


  const { isPending, error, data } = useQuery(userQueryOptions)

  if (isPending) return "loading..."
  if (error) return "not logged in!"

  return (
    <div className="p-2">
      <p>Hello {data.given_name}</p>
      <a href="api/logout">Logout</a>
    </div>
  )
}