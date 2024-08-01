import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About
})

function About() {

  async function getUserInfo() {
    const res = await api.me.$get()
    if (!res.ok) {
      throw new Error("server error")
    }
    const data = res.json()
    return data
  }

  const { data, isPending } = useQuery({
    queryKey: ["get-all-todos"],
    queryFn: getUserInfo
  })

  return (
    <div>
      {
        isPending ? <div>loading...</div> : <div>{data?.given_name}</div>
      }
    </div>
  )
}

