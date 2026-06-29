import Button from "./Button";

function TodoItem({
  task,
  editTask,
  deleteTask,
  toggleComplete,
  onDragStart,
  onDrop,
}) {

  return (

    <div
      className="task-item"
      draggable
      onDragStart={onDragStart}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >

      <div className="task-left">

        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
        />

        <p className={task.completed ? "completed" : ""}>
          {task.title}
        </p>

      </div>

      <div className="task-buttons">

        <Button
          text="Edit"
          onClick={editTask}
        />

        <Button
          text="Delete"
          onClick={() => deleteTask(task.id)}
        />

      </div>

    </div>

  );
}

export default TodoItem;