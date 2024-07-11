import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutTemplate, PinOff, TableProperties } from "lucide-react";
import TaskDialog from "./TaskDialog";
import SortableTaskList from "./SortableTaskList";
import TaskTable from "./TaskTable";
import SortableItem from "./SortableItem";

const TaskTabs = ({
  tasks,
  setTasks,
  updateTodo,
  handleDeleteTask,
  handlePin,
  updateTaskLocaly,
  deleteTodoOfTask,
  loading,
  pinnedTasks,
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
        {pinnedTasks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <h2 className="text-primary uppercase tracking-tighter font-black text-xl py-4">
              Pinned Tasks
            </h2>
            <div>
              {pinnedTasks.map((task) => (
                <SortableItem
                  key={task._id}
                  id={task._id}
                  content={task}
                  onTodoUpdate={updateTodo}
                  handleDeleteTask={handleDeleteTask}
                  handlePin={handlePin}
                  updateTaskLocaly={updateTaskLocaly}
                  deleteTodoOfTask={deleteTodoOfTask}
                  iconPin={<PinOff />}
                />
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
        {tasks.length > 0 ? (
          <div>
            <h2 className="text-primary uppercase tracking-tighter font-black text-xl py-4">
              Unpinned Tasks
            </h2>
            <div>
              <SortableTaskList
                tasks={tasks}
                setTasks={setTasks}
                updateTodo={updateTodo}
                handleDeleteTask={handleDeleteTask}
                handlePin={handlePin}
                updateTaskLocaly={updateTaskLocaly}
                deleteTodoOfTask={deleteTodoOfTask}
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </TabsContent>
      <TabsContent value="table">
        <TaskTable tasks={tasks} handleDeleteTask={handleDeleteTask} />
      </TabsContent>
    </Tabs>
  );
};

export default TaskTabs;
