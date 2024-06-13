import type { TaskProps } from "../Types/TaskProps";

export interface NewTaskModalProps {
  isOpen: boolean;
  onKeyDown: () => void;
  onClose: () => void;
  onTaskCreation: (arg0: TaskProps) => void;
}
