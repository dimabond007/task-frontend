import React, { useEffect, useState } from "react";
import { useUserContext } from "@/contexts/UserContext";
import api from "../services/api.service";
import TaskTabs from "../components/TaskTabs";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useUserContext();

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await api.get("/task");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    }

    if (token) {
      fetchTasks();
    }
  }, [token]);

  async function deleteTodoOfTask(todoId, taskId) {
    const updatedTasks = tasks.map((task) =>
      task._id === taskId
        ? {
            ...task,
            todoList: task.todoList.filter((todo) => todo._id !== todoId),
          }
        : task
    );
    setTasks(updatedTasks);

    // Update task in the server
    const taskUpdate = tasks.find((task) => task.id === taskId);
    try {
      await api.put(`/task/${taskId}`, taskUpdate);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  function updateTaskLocaly(taskUpdate) {
    const updatedTasks = tasks.map((task) =>
      task._id === taskUpdate._id ? taskUpdate : task
    );
    setTasks(updatedTasks);
  }

  async function updateTodo(taskId, todoId, isComplete) {
    try {
      await api.put(`/task/${taskId}/todo/${todoId}`, { isComplete });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId
            ? {
                ...task,
                todoList: task.todoList.map((todo) =>
                  todo._id === todoId ? { ...todo, isComplete } : todo
                ),
              }
            : task
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  }

  async function handlePin(id) {
    try {
      await api.put(`/task/${id}/pin`);
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          return task._id === id ? { ...task, isPinned: !task.isPinned } : task;
        })
      );
    } catch (error) {
      console.error("Error pinning task:", error);
    }
  }

  const handleDeleteTask = async (taskId) => {
    try {
      await api.delete(`/task/${taskId}`);

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div>
      <h1 className="text-primary uppercase tracking-tighter font-black text-3xl py-4">
        My Tasks
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <TaskTabs
          tasks={tasks}
          setTasks={setTasks}
          updateTodo={updateTodo}
          handleDeleteTask={handleDeleteTask}
          handlePin={handlePin}
          updateTaskLocaly={updateTaskLocaly}
          deleteTodoOfTask={deleteTodoOfTask}
        />
      )}
    </div>
  );
}
