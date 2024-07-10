import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useTheme } from "@/contexts/ThemeProvider";
import api from "../services/api.service";

const TaskDialog = ({ tasks, setTasks }) => {
  const [creatingTask, setCreatingTask] = useState({
    title: "",
    description: "",
    todoList: [],
  });
  const { theme } = useTheme();

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setCreatingTask((prevTask) => ({
      ...prevTask,
      [field]: value,
    }));

    if (value.trim() === "") {
      setCreatingTask((prevTask) => ({
        ...prevTask,
        [field]: "",
      }));
    }
  };

  const handleAddTodo = () => {
    setCreatingTask((prevTask) => ({
      ...prevTask,
      todoList: [...prevTask.todoList, { title: "", isComplete: false }],
    }));
  };

  const handleTodoChange = (index, value) => {
    setCreatingTask((prevTask) => {
      const newTodoList = prevTask.todoList.map((todo, i) =>
        i === index ? { ...todo, title: value } : todo
      );
      return { ...prevTask, todoList: newTodoList };
    });
  };

  return (
    <Dialog>
      <DialogTrigger className="text-secondary-foreground">
        <Plus />
      </DialogTrigger>
      <DialogContent
        className={
          theme === "light" ? "light-theme-custom" : "dark-theme-custom"
        }
      >
        <DialogHeader>
          <DialogTitle className="text-primary">Creating Task</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-secondary-foreground">
              Title
            </Label>
            <Input
              id="title"
              value={creatingTask?.title || ""}
              onChange={(e) => handleInputChange(e, "title")}
              className="col-span-3 text-secondary-foreground"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-secondary-foreground">
              Description
            </Label>
            <Input
              id="description"
              value={creatingTask?.description || ""}
              onChange={(e) => handleInputChange(e, "description")}
              className="col-span-3 text-secondary-foreground"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-secondary-foreground">To do:</Label>
            <Button onClick={handleAddTodo} className="text-secondary">
              Add Todo
            </Button>
          </div>
          {creatingTask.todoList.map((todo, index) => (
            <div key={index} className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor={`todo-${index}`}
                className="text-secondary-foreground"
              >
                Todo {index + 1}
              </Label>
              <Input
                id={`todo-${index}`}
                value={todo.title}
                onChange={(e) => handleTodoChange(index, e.target.value)}
                className="col-span-3 text-secondary-foreground"
              />
            </div>
          ))}
          <div className="flex items-center justify-center gap-4">
            <DialogPrimitive.Close className="w-full">
              <Button
                className="flex-grow w-full"
                disabled={!creatingTask.title || !creatingTask.description}
                onClick={() => {
                  api.post("/task", creatingTask).then((response) => {
                    setTasks([response.data, ...tasks]);
                    setCreatingTask({
                      title: "",
                      description: "",
                      todoList: [],
                    });
                  });
                }}
              >
                Create
              </Button>
            </DialogPrimitive.Close>

            <DialogPrimitive.Close className="w-full">
              <Button
                className="flex-grow w-full text-secondary-foreground"
                variant="ghost"
                onClick={() =>
                  setCreatingTask({
                    title: "",
                    description: "",
                    todoList: [],
                  })
                }
              >
                Cancel
              </Button>
            </DialogPrimitive.Close>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDialog;
