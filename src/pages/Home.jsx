import React, { useState } from "react";
import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableItem({ id, children }) {
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
    padding: "10px",
    margin: "5px",
    backgroundColor: "lightblue",
    cursor: "grab",
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}

function Column({ id, items }) {
  return (
    <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
      <div
        style={{
          border: "1px solid black",
          margin: "10px",
          padding: "10px",
          width: "200px",
          minHeight: "200px",
        }}
      >
        {items.map((item) => (
          <SortableItem key={item.id} id={item.id}>
            {item.content}
          </SortableItem>
        ))}
      </div>
    </SortableContext>
  );
}

function Home() {
  const [activeId, setActiveId] = useState(null);
  const [columns, setColumns] = useState({
    column1: [
      { id: "1", content: "Item 1", height: "50px" },
      { id: "2", content: "Item 2", height: "80px" },
    ],
    column2: [
      { id: "3", content: "Item 3", height: "60px" },
      { id: "4", content: "Item 4", height: "40px" },
    ],
  });

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const sourceColumn = findColumn(active.id);
      const destinationColumn = findColumn(over.id);

      if (sourceColumn === destinationColumn) {
        const updatedItems = arrayMove(
          columns[sourceColumn],
          columns[sourceColumn].findIndex((item) => item.id === active.id),
          columns[sourceColumn].findIndex((item) => item.id === over.id)
        );
        setColumns({ ...columns, [sourceColumn]: updatedItems });
      } else {
        const sourceItems = Array.from(columns[sourceColumn]);
        const destinationItems = Array.from(columns[destinationColumn]);
        const [movedItem] = sourceItems.splice(
          sourceItems.findIndex((item) => item.id === active.id),
          1
        );
        destinationItems.splice(
          destinationItems.findIndex((item) => item.id === over.id),
          0,
          movedItem
        );

        setColumns({
          ...columns,
          [sourceColumn]: sourceItems,
          [destinationColumn]: destinationItems,
        });
      }
    }
    setActiveId(null);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;

    if (!over) return;

    const sourceColumn = findColumn(active.id);
    const destinationColumn = findColumn(over.id);

    if (sourceColumn !== destinationColumn) {
      const sourceItems = Array.from(columns[sourceColumn]);
      const destinationItems = Array.from(columns[destinationColumn]);
      const [movedItem] = sourceItems.splice(
        sourceItems.findIndex((item) => item.id === active.id),
        1
      );

      destinationItems.splice(
        destinationItems.findIndex((item) => item.id === over.id),
        0,
        movedItem
      );

      setColumns({
        ...columns,
        [sourceColumn]: sourceItems,
        [destinationColumn]: destinationItems,
      });
    }
  };

  const findColumn = (itemId) => {
    return Object.keys(columns).find((columnId) =>
      columns[columnId].some((item) => item.id === itemId)
    );
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div style={{ display: "flex" }}>
        {Object.keys(columns).map((columnId) => (
          <Column key={columnId} id={columnId} items={columns[columnId]} />
        ))}
      </div>
      <DragOverlay>
        {activeId ? (
          <div style={{ padding: "10px", backgroundColor: "lightblue" }}>
            {activeId}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default Home;
