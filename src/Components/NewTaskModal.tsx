import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { NewTaskModalProps } from "../Types/NewTaskModalProps";
import { Button } from "./Button";
import type { TaskProps } from "../Types/TaskProps";
export function NewTaskModal({
  isOpen,
  onClose,
  onTaskCreation,
}: NewTaskModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [newTask, setNewTask] = useState<TaskProps>({
    title: "",
    content: "",
    status: "Not started",
    timestamp: Date.now(),
  });

  const handleChange = (ev: SyntheticEvent) => {
    const target = ev.target as HTMLInputElement;

    setNewTask({
      ...newTask,
      [target.name]: target.value,
    });
  };

  const handleFormSubmission = (ev: any) => {
    ev.preventDefault();
    console.log("handleFormSubmission", handleFormSubmission);
    onTaskCreation(newTask);
  };

  const handleOpen = () => {
    if (dialogRef.current) {
      document.body.style.overflow = "hidden";
      dialogRef.current.showModal();
    }
  };

  const handleClose = () => {
    if (dialogRef.current) {
      onClose();
      dialogRef.current?.close();
      document.body.style.overflow = "scroll";
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      handleClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      handleOpen();
    } else {
      handleClose();
    }
  }, [handleClose, isOpen]);

  return createPortal(
    <dialog ref={dialogRef} onKeyDown={handleKeyDown}>
      <form>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={newTask.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Content:
          <input
            type="text"
            name="content"
            value={newTask.content}
            onChange={handleChange}
          />
        </label>
        <label>
          Status:
          <select name="status" value={newTask.status} onChange={handleChange}>
            <option value="Not started">Not started</option>
            <option value="In progress">In progress</option>
            <option value="Completed">Completed</option>
          </select>
        </label>
        {newTask.title !== "" ? (
          <Button onClick={handleFormSubmission} label="Add task" />
        ) : null}
      </form>

      <button onClick={handleClose}>Close</button>
    </dialog>,
    document.body
  );
}
