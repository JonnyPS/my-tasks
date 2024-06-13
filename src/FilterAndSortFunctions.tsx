import type { status, TaskProps } from "./Types/TaskProps";

export const showTotalNumTickets = (arr: TaskProps[]) => {
  return arr.length;
};

export const showFilteredTickets = (arr: TaskProps[], statusType: status) => {
  return arr.filter((task) => task.status === statusType);
};
