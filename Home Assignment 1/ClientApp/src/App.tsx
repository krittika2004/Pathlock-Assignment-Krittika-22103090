import React, { useState, useEffect } from "react";
import axios from "axios";
import type { TaskItem } from "./types";

const API_URL = "http://localhost:5139/api/tasks";

function App() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [newDesc, setNewDesc] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      const response = await axios.get<TaskItem[]>(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  async function addTask() {
    if (!newDesc.trim()) return;
    try {
      const response = await axios.post<TaskItem>(API_URL, {
    description: newDesc,
    isCompleted: false,
});
      setTasks([...tasks, response.data]);
      setNewDesc("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }

  async function toggleCompletion(task: TaskItem) {
    try {
      await axios.put(`${API_URL}/${task.id}`, {
        ...task,
        isCompleted: !task.isCompleted,
      });
      setTasks(tasks.map(t => (t.id === task.id ? { ...t, isCompleted: !t.isCompleted } : t)));
    } catch (error) {
      console.error("Error toggling completion:", error);
    }
  }

  async function deleteTask(id: string) {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h1>Task Manager</h1>
      <input
        type="text"
        placeholder="New task description"
        value={newDesc}
        onChange={e => setNewDesc(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.isCompleted}
              onChange={() => toggleCompletion(task)}
            />
            <span style={{ textDecoration: task.isCompleted ? "line-through" : "none" }}>
              {task.description}
            </span>
            <button onClick={() => deleteTask(task.id)}>✖</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
