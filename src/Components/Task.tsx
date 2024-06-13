import type { TaskProps } from "../Types/TaskProps";
import { Button } from "./Button";

import classNames from "classnames";
import styles from "./task.module.css";

export function Task({
  content,
  onDelete,
  onStatusUpdate,
  status,
  timestamp,
  title,
}: TaskProps) {
  const date = new Date(timestamp);
  const formattedDate = `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`;

  const statusClassnames = classNames({
    [styles["status--completed"]]: status === "Completed",
    [styles["status--in-progress"]]: status === "In progress",
    [styles["status--not-started"]]: status === "Not started",
  });

  const handleClick = () => {
    if (onDelete) {
      onDelete(title);
    }
  };

  const handleChange = (title: string, ev: any) => {
    if (onStatusUpdate) {
      onStatusUpdate(title, ev.target.value);
    }
  };

  return (
    <li>
      <span className={statusClassnames}>{status}</span>
      <h3>{title}</h3>
      <p>{content}</p>

      <select
        name="status"
        value={status}
        onChange={(ev) => handleChange(title, ev)}
      >
        <option value="Not started">Not started</option>
        <option value="In progress">In progress</option>
        <option value="Completed">Completed</option>
      </select>
      <Button onClick={handleClick} label="Delete task" name="deleteButton" />
      <p>Created on: {timestamp === undefined ? "N/A" : formattedDate}</p>
    </li>
  );
}
