import { Toaster } from '@/components/ui/sonner';
import { type QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root
})

function Root() {
  return (
    <div className="h-full w-full">
      <Outlet />
      <Toaster />
    </div>
  )
}
