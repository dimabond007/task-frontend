import React from "react";
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
import { X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

function SortableItem({ task, updateTodo }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task._id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    boxShadow: isDragging ? "0 4px 8px rgba(0, 0, 0, 0.1)" : "none",
    backgroundColor: isDragging ? "rgba(255, 255, 255, 0.8)" : "white", // Ensure visibility of dragging item
    zIndex: isDragging ? 1000 : "auto", // Ensure dragging item is on top
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex-grow"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            {task.title}
            <Button variant="ghost" className="p-0 h-auto">
              <X />
            </Button>
          </CardTitle>
          <CardDescription>{task.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {task.todoList.map((todo) => (
            <div key={todo._id} className="flex gap-2 items-center">
              <Checkbox
                checked={todo.isComplete}
                onCheckedChange={(isComplete) => {
                  updateTodo(task._id, todo._id, isComplete);
                }}
              />
              <label className="font-medium">{todo.title}</label>
            </div>
          ))}
        </CardContent>
      </Card>
    </li>
  );
}

export default SortableItem;
