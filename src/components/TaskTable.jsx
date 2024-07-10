import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const TaskTable = ({ tasks, handleDeleteTask }) => {
  return (
    <Table className="text-secondary-foreground">
      <TableCaption>A list of your tasks.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="w-20">To do</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task._id}>
            <TableCell>{task.title}</TableCell>
            <TableCell>{task.description}</TableCell>
            <TableCell>
              {task.todoList.filter((todo) => todo.isComplete).length}/
              {task.todoList.length}
            </TableCell>
            <TableCell>
              <Button
                variant="ghost"
                className="p-2 h-8"
                onClick={() => handleDeleteTask(task._id)}
              >
                <Trash2 className="w-5" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TaskTable;
