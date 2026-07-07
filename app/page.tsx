"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);

  // Load tasks from browser
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  // Save tasks to browser
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, task]);
    setTask("");
  };

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-10 bg-purple-100">
      <h1 className="text-3xl font-bold mb-6 text-black">Task Manager</h1>

      <div className="flex gap-2 mb-6 text-black">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
          className="border p-2 rounded w-64 text-black"
        />
        <button onClick={addTask} className="bg-green-500 text-black px-4 py-2 rounded">
          Add
        </button>
      </div>

      <ul className="w-80">
        {tasks.map((t, index) => (
          <li key={index} className="bg-blue p-3 mb-2 rounded shadow flex justify-between">
            {t}
            <button onClick={() => deleteTask(index)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}