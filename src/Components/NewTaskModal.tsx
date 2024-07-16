import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { NewTaskModalProps } from "../Types/NewTaskModalProps";
import { Button } from "./Button";
import type { TaskProps } from "../Types/TaskProps";
import styles from "./task-modal.module.css";

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <dialog
      ref={dialogRef}
      onKeyDown={handleKeyDown}
      className={styles["TaskModal__Dialog"]}
    >
      <form className={styles["TaskModal"]}>
        <label className={styles["TaskModal__Label"]}>
          Title:
          <input
            type="text"
            name="title"
            value={newTask.title}
            onChange={handleChange}
            className={styles["TaskModal__Input"]}
          />
        </label>
        <label className={styles["TaskModal__Label"]}>
          Content:
          <input
            type="text"
            name="content"
            value={newTask.content}
            onChange={handleChange}
            className={styles["TaskModal__Input"]}
          />
        </label>
        <label className={styles["TaskModal__Label"]}>
          Status:
          <select
            name="status"
            value={newTask.status}
            onChange={handleChange}
            className={styles["TaskModal__Input"]}
          >
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
