import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Pencil, Pin, Plus, Save, Trash2, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { DialogHeader, DialogTrigger } from "./ui/dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "postcss";

function SortableItem({
  id,
  content,
  onTodoUpdate,
  handleDeleteTask,
  handlePin,
  updateTaskLocaly,
  deleteTodoOfTask,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const [editTask, setEditTask] = useState({
    _id: content._id,
    title: content.title,
    description: content.description,
    completed: content.completed,
    todoList: content.todoList || [], // Добавлено значение по умолчанию
  });

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
                <DialogContent className="theme-custom">
                  <DialogHeader>
                    <DialogTitle>Edit Task</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col gap-4 py-4">
                    <div className="flex flex-col gap-4">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        type="text"
                        id="title"
                        value={editTask.title}
                        onChange={(e) =>
                          setEditTask({ ...editTask, title: e.target.value })
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-4">
                      <Label htmlFor="description">Description</Label>
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
                      />
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                      <div className="flex flex-col gap-4 w-full">
                        <Label>Todos of this task:</Label>
                        <Separator />

                        {editTask.todoList.map((todo, index) => (
                          <div
                            key={todo._id}
                            className="flex gap-2 justify-between items-center "
                          >
                            <label className="font-medium">{todo.title}</label>
                            <Trash2
                              onClick={() => {
                                deleteTodoOfTask(editTask._id, todo._id);
                                setEditTask({
                                  title: editTask.title,
                                  description: editTask.description,
                                  completed: editTask.completed,
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
                      </div>
                      <Button
                        onClick={async () => {
                          await api.patch("/task/" + id, editTask);
                          // setEditTask({
                          //   ...editTask,
                          // });
                          updateTaskLocaly(editTask);
                        }}
                        className="flex gap-2"
                      >
                        {" "}
                        <Save />
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Button
                variant="ghost"
                className="p-0 h-auto"
                onClick={() => handlePin(id)}
              >
                <Pin />
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
}

export default SortableItem;
