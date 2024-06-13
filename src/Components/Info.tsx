import {
  showTotalNumTickets,
  showFilteredTickets,
} from "../FilterAndSortFunctions";
import type { InfoProps } from "../Types/InfoProps";

import classNames from "classnames";
import styles from "../App.module.css";

export function Info({ arr }: InfoProps) {
  const InfoClassNames = classNames(styles["InfoContainer"]);

  return (
    <div className={InfoClassNames}>
      <p>Tickets: {showTotalNumTickets(arr)}</p>
      <p>Completed: {showFilteredTickets(arr, "Completed").length}</p>
      <p>In progress: {showFilteredTickets(arr, "In progress").length}</p>
      <p>Not started: {showFilteredTickets(arr, "Not started").length}</p>
    </div>
  );
}
