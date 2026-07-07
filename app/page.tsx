"use client";
import { useState } from "react";

type Task = {
  text: string;
  done: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, { text: input, done: false }]);
    setInput("");
  }

  const toggleTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].done = !newTasks[index].done;
    setTasks(newTasks);
  }

  return (
    <main className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 w-full max-w-md p-8 rounded-xl">
        <h1 className="text-3xl font-bold text-cyan-400 mb-6 text-center">Task Manager</h1>
        <div className="flex gap-2 mb-6">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg outline-none"
            placeholder="Add a new task..."
          />
          <button onClick={addTask} className="bg-cyan-500 px-4 py-2 rounded-lg font-bold text-black">Add</button>
        </div>
        <div className="space-y-2">
          {tasks.map((task, index) => (
            <div
              key={index}
              onClick={() => toggleTask(index)}
              className={`p-3 rounded-lg cursor-pointer ${task.done ? 'bg-gray-700 line-through text-gray-500' : 'bg-gray-700 text-white'}`}
            >
              {task.text}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}