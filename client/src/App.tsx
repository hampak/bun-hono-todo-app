import { useEffect, useState } from "react"

interface Todo {
  id: number;
  title: string;
  description: string
}

function App() {

  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    async function fetchTodos() {
      const res = await fetch("/api/todos")
      const data = await res.json()
      setTodos(data.todos)
    }

    fetchTodos()
  }, [])

  console.log(todos)

  if (!todos.length) {
    return null
  }

  return (
    <div>
      {todos[0].title}
    </div>
  )
}

export default App
