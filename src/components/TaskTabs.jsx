import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutTemplate, TableProperties } from "lucide-react";
import TaskDialog from "./TaskDialog";
import SortableTaskList from "./SortableTaskList";
import TaskTable from "./TaskTable";

const TaskTabs = ({
  tasks,
  setTasks,
  updateTodo,
  handleDeleteTask,
  handlePin,
  updateTaskLocaly,
  deleteTodoOfTask,
  loading,
}) => {
  return (
    <Tabs defaultValue="blocks">
      <div className="flex justify-between">
        <TabsList>
          <TabsTrigger value="blocks">
            <LayoutTemplate />
          </TabsTrigger>
          <TabsTrigger value="table">
            <TableProperties />
          </TabsTrigger>
        </TabsList>
        <TaskDialog tasks={tasks} setTasks={setTasks} />
      </div>
      <TabsContent value="blocks" className="w-full">
        <SortableTaskList
          tasks={tasks}
          setTasks={setTasks}
          updateTodo={updateTodo}
          handleDeleteTask={handleDeleteTask}
          handlePin={handlePin}
          updateTaskLocaly={updateTaskLocaly}
          deleteTodoOfTask={deleteTodoOfTask}
        />
      </TabsContent>
      <TabsContent value="table">
        <TaskTable tasks={tasks} handleDeleteTask={handleDeleteTask} />
      </TabsContent>
    </Tabs>
  );
};

export default TaskTabs;
