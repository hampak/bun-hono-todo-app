import Login from "@/components/authentication/login"
import { userQueryOptions } from "@/lib/actions"
import { createFileRoute, Outlet } from "@tanstack/react-router"

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
      return data
    } catch (e) {
      return {
        user: null
      }
    }
  },
  component: Component
})