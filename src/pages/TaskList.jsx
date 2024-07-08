import { useUserContext } from "@/contexts/UserContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  LayoutTemplate,
  Pencil,
  Pin,
  Plus,
  TableProperties,
  Trash2,
  X,
} from "lucide-react";
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
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = ({
  id,
  content,
  onTodoUpdate,
  handleDeleteTask,
  handlePin,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

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
              <Button
                variant="ghost"
                className="p-0 h-auto"
                onClick={() => handleDeleteTask(id)}
              >
                <Pencil />
              </Button>
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
};

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  // const [pinedTa]

  const [loading, setLoading] = useState(true);
  const { token } = useUserContext();
  const [creatingTask, setCreatingTask] = useState({
    title: "",
    description: "",
    todoList: [],
  });
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await axios.get("http://localhost:3000/api/task", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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

  async function updateTodo(taskId, todoId, isComplete) {
    try {
      await axios.put(
        `http://localhost:3000/api/task/${taskId}/todo/${todoId}`,
        { isComplete },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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

  const updateTaskOrder = async (updatedTasks) => {
    try {
      await axios.put(
        "http://localhost:3000/api/task/reorder",
        { tasks: updatedTasks },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error updating task order:", error);
    }
  };

  async function handlePin(id) {
    try {
      await axios.put(
        `http://localhost:3000/api/task/${id}/pin`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("pin");
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          return task._id === id ? { ...task, isPinned: !task.isPinned } : task;
        })
      );
    } catch (error) {
      console.error("Error pinning task:", error);
    }
  }

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

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/api/task/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
            <Dialog>
              <DialogTrigger>
                <Plus />
              </DialogTrigger>
              <DialogContent className="theme-custom">
                <DialogHeader>
                  <DialogTitle>Creating Task</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={creatingTask?.title || ""}
                      onChange={(e) => handleInputChange(e, "title")}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={creatingTask?.description || ""}
                      onChange={(e) => handleInputChange(e, "description")}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>To do:</Label>
                    <Button onClick={handleAddTodo}>Add Todo</Button>
                  </div>
                  {creatingTask.todoList.map((todo, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-4 items-center gap-4"
                    >
                      <Label htmlFor={`todo-${index}`}>Todo {index + 1}</Label>
                      <Input
                        id={`todo-${index}`}
                        value={todo.title}
                        onChange={(e) =>
                          handleTodoChange(index, e.target.value)
                        }
                        className="col-span-3"
                      />
                    </div>
                  ))}
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      className="flex-grow"
                      disabled={
                        !creatingTask.title || !creatingTask.description
                      }
                      onClick={() => {
                        axios
                          .post(
                            "http://localhost:3000/api/task",
                            creatingTask,
                            {
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            }
                          )
                          .then((response) => {
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
                    <Button
                      className="flex-grow"
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
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <TabsContent value="blocks" className="w-full">
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
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </TabsContent>
          <TabsContent value="table">
            <Table>
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
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
