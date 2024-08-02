import { Button } from "../ui/button";

export default function Login() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-green-200s">
      <div className="w-[450px] border border-gray-300 rounded-lg p-3 flex flex-col items-center">
        <h1 className="text-2xl font-bold">Bun X Hono Todo App</h1>
        <div className="mt-5">
          <Button
            role="link"
          >
            <a
              href="/api/login"
            >
              Get Started
            </a>
          </Button>
        </div>
        <div className="mt-4">
          <p className="text-sm text-center">
            Hello! This is a simple project I build using <a href="https://bun.sh/" target="_blank" className="underline underline-offset-1">Bun</a>, <a href="https://hono.dev/" target="_blank" className="underline underline-offset-1">Hono</a>, and React.
          </p>
        </div>
      </div>
    </div>
  )
}