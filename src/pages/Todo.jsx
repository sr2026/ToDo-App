import { useState, useEffect } from "react";
import "./Todo.css";

import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";
import Modal from "../components/Modal";

function Todo() {

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [dragIndex, setDragIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title) => {

    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };

    setTasks([...tasks, newTask]);
  };
  const deleteTask = (id) => {

    const updatedTasks = tasks.filter(
      (task) => task.id !== id
    );

    setTasks(updatedTasks);
  };
  const editTask = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };
  const saveTask = (id, title) => {

    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, title }
        : task
    );

    setTasks(updatedTasks);
  };
  const toggleComplete = (id) => {

    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    );

    setTasks(updatedTasks);
  };
  const handleDragStart = (index) => {
    setDragIndex(index);
  };
  const handleDrop = (index) => {

    if (dragIndex === null || dragIndex === index) return;

    const updatedTasks = [...tasks];

    const draggedTask = updatedTasks[dragIndex];

    updatedTasks.splice(dragIndex, 1);

    updatedTasks.splice(index, 0, draggedTask);

    setTasks(updatedTasks);

    setDragIndex(null);
  };
  
  const filteredTasks = tasks.filter((task) => {

    const matchSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    if (filter === "Completed") {
      return matchSearch && task.completed;
    }

    if (filter === "Pending") {
      return matchSearch && !task.completed;
    }

    return matchSearch;
  });

  return (
    <div className="todo-container">

      <h1>Todo App</h1>

      <TodoForm addTask={addTask} />

      <input
        type="text"
        className="search-input"
        placeholder="Search task..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="filter-buttons">

        <button onClick={() => setFilter("All")}>
          All
        </button>

        <button onClick={() => setFilter("Pending")}>
          Pending
        </button>

        <button onClick={() => setFilter("Completed")}>
          Completed
        </button>

      </div>

      {filteredTasks.length > 0 ? (

        filteredTasks.map((task, index) => (

          <TodoItem
            key={task.id}
            task={task}
            editTask={() => editTask(task)}
            deleteTask={deleteTask}
            toggleComplete={toggleComplete}
            onDragStart={() => handleDragStart(index)}
            onDrop={() => handleDrop(index)}
          />

        ))

      ) : (

        <p style={{ textAlign: "center", marginTop: "20px" }}>
          No tasks found.
        </p>

      )}

      <Modal
        isOpen={isModalOpen}
        task={selectedTask}
        onClose={() => setIsModalOpen(false)}
        onSave={saveTask}
      />

    </div>
  );
}

export default Todo;