"use client"
import { useState } from "react"

type Task = {
  text: string
  completed: boolean
}

export default function Home() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState<Task[]>([])

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { text: task, completed: false }])
      setTask("")
    }
  }

  const deleteTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index)
    setTasks(newTasks)
  }

  const toggleComplete = (index: number) => {
    const newTasks = [...tasks]
    newTasks[index].completed = !newTasks[index].completed
    setTasks(newTasks)
  }

  const editTask = (index: number) => {
    const newText = prompt("Edit task:", tasks[index].text)
    if (newText !== null && newText.trim() !== "") {
      const newTasks = [...tasks]
      newTasks[index].text = newText
      setTasks(newTasks)
    }
  }

  const deleteAll = () => {
    setTasks([])
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-10 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-black">Task Manager</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          placeholder="Add a new task"
          className="border-2 border-purple-400 p-2 rounded w-64 text-black bg-white"
        />
        <button onClick={addTask} className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 font-semibold">
          Add
        </button>
      </div>

      {tasks.length > 0 && (
        <button onClick={deleteAll} className="bg-red-500 text-white px-4 py-2 rounded mb-4 hover:bg-red-600 font-semibold">
          Delete All
        </button>
      )}

      <ul className="w-full max-w-md">
        {tasks.map((t, index) => (
          <li key={index} className={`bg-white p-3 mb-2 rounded shadow flex justify-between items-center text-black ${t.completed ? 'line-through opacity-60' : ''}`}>
            <span onClick={() => toggleComplete(index)} className="cursor-pointer flex-1">
              {t.completed ? '✅ ' : '⭕ '}{t.text}
            </span>
            <div className="flex gap-3">
              <button onClick={() => editTask(index)} className="text-blue-500 font-semibold hover:text-blue-700">
                Edit
              </button>
              <button onClick={() => deleteTask(index)} className="text-red-500 font-semibold hover:text-red-700">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}