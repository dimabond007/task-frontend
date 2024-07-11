import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Pencil, Pin, Plus, Save, Trash2, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useTheme } from "@/contexts/ThemeProvider";

const SortableItem = ({
  id,
  content,
  onTodoUpdate,
  handleDeleteTask,
  handlePin,
  updateTaskLocaly,
  deleteTodoOfTask,
  iconPin,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  const DialogClose = DialogPrimitive.Close;

  const [editTask, setEditTask] = useState({
    _id: content._id,
    title: content.title,
    description: content.description,
    completed: content.completed,
    todoList: content.todoList || [],
  });
  const { theme } = useTheme();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: isDragging ? "rgba(255, 255, 255, 0.8)" : "white",
    boxShadow: isDragging ? "0 4px 8px rgba(0, 0, 0, 0.1)" : "none",
    display: "flex",
    alignItems: "center",
    flex: 1,
    flexGrow: 1,
    minWidth: "300px",
    marginBottom: "10px",
  };

  const handleTodoTitleChange = (index, newTitle) => {
    const updatedTodoList = editTask.todoList.map((todo, i) =>
      i === index ? { ...todo, title: newTitle } : todo
    );
    setEditTask({ ...editTask, todoList: updatedTodoList });
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card className="h-full w-full">
        <CardHeader>
          <CardTitle className="flex justify-between items-start">
            {content.title}
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger>
                  <Pencil />
                </DialogTrigger>
                <DialogContent
                  className={
                    theme === "light"
                      ? "light-theme-custom"
                      : "dark-theme-custom"
                  }
                >
                  <DialogHeader className="text-primary">
                    <DialogTitle>Edit Task</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col gap-4 py-4">
                    <div className="flex flex-col gap-4">
                      <Label
                        htmlFor="title"
                        className="text-secondary-foreground"
                      >
                        Title
                      </Label>
                      <Input
                        type="text"
                        id="title"
                        value={editTask.title}
                        onChange={(e) =>
                          setEditTask({ ...editTask, title: e.target.value })
                        }
                        className="text-secondary-foreground"
                      />
                    </div>
                    <div className="flex flex-col gap-4">
                      <Label
                        htmlFor="description"
                        className="text-secondary-foreground"
                      >
                        Description
                      </Label>
                      <Input
                        type="text"
                        id="description"
                        value={editTask.description}
                        onChange={(e) =>
                          setEditTask({
                            ...editTask,
                            description: e.target.value,
                          })
                        }
                        className="text-secondary-foreground"
                      />
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                      <Label className="text-secondary-foreground">
                        Todos of this task:
                      </Label>
                      <Separator />
                      {editTask.todoList.map((todo, index) => (
                        <div
                          key={index}
                          className="flex gap-2 justify-between items-center"
                        >
                          <Input
                            type="text"
                            className="text-secondary-foreground"
                            value={todo.title}
                            onChange={(e) =>
                              handleTodoTitleChange(index, e.target.value)
                            }
                          />
                          <Trash2
                            className="text-secondary-foreground"
                            onClick={() => {
                              deleteTodoOfTask(editTask._id, todo._id);
                              setEditTask({
                                ...editTask,
                                todoList: editTask.todoList.filter(
                                  (t) => t._id !== todo._id
                                ),
                              });
                              updateTaskLocaly(editTask);
                            }}
                          />
                        </div>
                      ))}
                      <Separator />
                      <Button
                        onClick={() =>
                          setEditTask({
                            ...editTask,
                            todoList: [
                              ...editTask.todoList,
                              { title: "", isComplete: false },
                            ],
                          })
                        }
                        className="flex gap-2"
                      >
                        <Plus />
                        Add Todo
                      </Button>
                      <DialogPrimitive.Close className="w-full">
                        <Button
                          onClick={async () => {
                            await api.patch("/task/" + id, editTask);
                            updateTaskLocaly(editTask);
                          }}
                          className="flex gap-2 w-full"
                        >
                          <Save />
                          Save Changes
                        </Button>
                      </DialogPrimitive.Close>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Button
                variant="ghost"
                className="p-0 h-auto"
                onClick={() => handlePin(id)}
              >
                {/* <Pin /> */}
                {iconPin}
              </Button>
              <Button
                variant="ghost"
                className="p-0 h-auto"
                onClick={() => handleDeleteTask(id)}
              >
                <X />
              </Button>
            </div>
          </CardTitle>
          <CardDescription>{content.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {content.todoList.map((todo) => (
            <div key={todo._id} className="flex gap-2 items-center">
              <Checkbox
                checked={todo.isComplete}
                onCheckedChange={(isComplete) =>
                  onTodoUpdate(content._id, todo._id, isComplete)
                }
              />
              <label className="font-medium">{todo.title}</label>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default SortableItem;
