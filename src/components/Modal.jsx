import { useState, useEffect } from "react";
import "./Modal.css";

function Modal({ isOpen, task, onSave, onClose }) {

  const [title, setTitle] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
    }
  }, [task]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (title.trim() === "") return;

    onSave(task.id, title);
    onClose();
  };

  return (
    <div className="modal-overlay">

      <div className="modal">

        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        <h2>Edit Task</h2>

        <p className="subtitle">
          Update your task
        </p>

        <label>Task Name</label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="modal-buttons">

          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>

          <button className="save-btn" onClick={handleSave}>
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
}

export default Modal;