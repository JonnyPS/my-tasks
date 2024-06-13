export type status = "Completed" | "In progress" | "Not started";
export interface TaskProps {
  content?: string;
  key?: number;
  onDelete?: (arg0: string) => void;
  onStatusUpdate?: (arg0: string, arg1: status) => void;
  status?: status;
  timestamp: number;
  title: string;
}
