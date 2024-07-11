import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import api from "../services/api.service";
import { Pin } from "lucide-react";

const SortableTaskList = ({
  tasks,
  setTasks,
  updateTodo,
  handleDeleteTask,
  handlePin,
  updateTaskLocaly,
  deleteTodoOfTask,
}) => {
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 250,
        distance: 10,
      },
    })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      setActiveId(null);
      return;
    }

    setTasks((items) => {
      const oldIndex = items.findIndex((item) => item._id === active.id);
      const newIndex = items.findIndex((item) => item._id === over.id);

      const updatedTasks = arrayMove(items, oldIndex, newIndex);
      updateTaskOrder(updatedTasks);
      return updatedTasks;
    });
    setActiveId(null);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;

    if (!over) return;
  };

  const updateTaskOrder = async (updatedTasks) => {
    try {
      await api.put("/task/reorder", { tasks: updatedTasks });
    } catch (error) {
      console.error("Error updating task order:", error);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
    >
      <SortableContext
        items={tasks.map((task) => task._id)}
        strategy={rectSortingStrategy}
      >
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <SortableItem
              key={task._id}
              id={task._id}
              content={task}
              onTodoUpdate={updateTodo}
              handleDeleteTask={handleDeleteTask}
              handlePin={handlePin}
              updateTaskLocaly={updateTaskLocaly}
              deleteTodoOfTask={deleteTodoOfTask}
              iconPin={<Pin />}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default SortableTaskList;
