import { userQueryOptions } from "@/lib/api"
import { createFileRoute, Outlet } from "@tanstack/react-router"

const Login = () => {
  return (
    <div>
      <p>You have to login</p>
      <a href="api/login">Login</a>
    </div>
  )
}

const Component = () => {
  const { user } = Route.useRouteContext()
  console.log(user)
  if (!user) {
    return <Login />
  }

  return <Outlet />
}

// src/routes/_authenticated.tsx
export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient
    try {
      const data = await queryClient.fetchQuery(userQueryOptions)
      return {
        user: data
      }
    } catch (e) {
      return {
        user: null
      }
    }
  },
  component: Component
})