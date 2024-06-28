import { useEffect, useState } from "react";
import { Task } from "./Components/Task";
import { Button } from "./Components/Button";
import type { TaskProps } from "./Types/TaskProps";
import { NewTaskModal } from "./Components/NewTaskModal";
import { Info } from "./Components/Info";
import type { status } from "./Types/TaskProps";

import styles from "./App.module.css";
import classNames from "classnames";
import { showFilteredTickets } from "./FilterAndSortFunctions";

function App() {
  const containerClassNames = classNames(styles["container"]);
  const newTaskButtonClassNames = classNames(styles["newTaskButton"]);
  const filterButtonsClassNames = classNames(styles["FilterButtons"]);

  const [allTaskData, setAllTaskData] = useState<Array<TaskProps>>([]);
  const [mutableAllTaskData, setMutableAllTaskData] = useState<
    Array<TaskProps>
  >([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isNotFirstRender, setIsNotFirstRender] = useState(false);

  // handle opening and closing of modal
  const handleModalOpen = () => {
    console.log("handleNewTask");
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    console.log("parent handleClose");
    setIsModalOpen(false);
  };

  // handle adding a new task to the list
  const handleTaskCreation = (task: TaskProps) => {
    // const updatedTasks = allTaskData;
    // updatedTasks.push(task);
    setAllTaskData([...allTaskData, task]);
    handleModalClose();
    setLocalStorage();
  };

  // handle deleting a task from the list
  const handleTaskDeletion = (title: string) => {
    const arr = allTaskData.filter((item) => item.title !== title);
    setAllTaskData(arr);
    setLocalStorage();
  };

  // handle updating a tasks status
  const handleStatusUpdate = (title: string, newStatus: status) => {
    const arr = allTaskData.map((item) =>
      item.title === title ? { ...item, status: newStatus } : { ...item }
    );
    setAllTaskData(arr);
    setLocalStorage();
  };

  const handleFilterByCompleted = () => {
    setMutableAllTaskData(showFilteredTickets(allTaskData, "Completed"));
  };

  const handleFilterByInProgress = () => {
    setMutableAllTaskData(showFilteredTickets(allTaskData, "In progress"));
  };

  const handleFilterByNotStarted = () => {
    setMutableAllTaskData(showFilteredTickets(allTaskData, "Not started"));
  };

  const setLocalStorage = () => {
    localStorage.setItem("tasks", JSON.stringify(allTaskData));
  };

  const getLocalStorage = () => {
    setAllTaskData(JSON.parse(localStorage.getItem("tasks") as string));
  };

  // on first run, go get localStorage data if it exists
  useEffect(() => {
    if (localStorage.getItem("tasks") !== null) {
      getLocalStorage();
    }
    setIsNotFirstRender(true);
  }, []);

  // on subsequent runs, set localStorage data to be that of our local state
  useEffect(() => {
    if (isNotFirstRender && localStorage.getItem("tasks") !== null) {
      setLocalStorage();
      setMutableAllTaskData(allTaskData);
    }
    console.log("allTaskData", allTaskData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTaskData]);

  useEffect(() => {
    console.log("mutableAllTaskData", mutableAllTaskData);
  }, [mutableAllTaskData]);

  return (
    <section className={containerClassNames}>
      <Button
        className={newTaskButtonClassNames}
        onClick={handleModalOpen}
        label="Create new task"
      />
      <Info arr={allTaskData} />
      <div className={filterButtonsClassNames}>
        <Button
          onClick={handleFilterByCompleted}
          label="Show Completed Tickets only"
        />

        <Button
          onClick={handleFilterByInProgress}
          label="Show In Progress Tickets only"
        />

        <Button
          onClick={handleFilterByNotStarted}
          label="Show Not Started Tickets only"
        />
      </div>
      {allTaskData.length === 0 ? (
        <p>No tasks - you are all caught up!</p>
      ) : mutableAllTaskData.length !== 0 ? (
        <ul>
          {mutableAllTaskData.map((task, index) => {
            return (
              <Task
                content={task.content}
                key={index}
                onDelete={handleTaskDeletion}
                onStatusUpdate={handleStatusUpdate}
                status={task.status}
                timestamp={task.timestamp}
                title={task.title}
              />
            );
          })}
        </ul>
      ) : (
        <p>No tasks to show</p>
      )}
      {isModalOpen ? (
        <NewTaskModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onKeyDown={handleModalClose}
          onTaskCreation={handleTaskCreation}
        />
      ) : null}
    </section>
  );
}

export default App;
