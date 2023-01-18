import React, { useState, useEffect } from "react";
import axios from "axios";

const DrfApiFetch = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState([]);
  const [id, setId] = useState(1);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/tasks/", {
        headers: {
          Authorization: "Token 3e8dfb2e7aafdf6d2e69279b32a8e5af08d262f4",
        },
      })
      .then((res) => {
        setTasks(res.data);
      });
  }, []);

  const getTask = () => {
    axios
      .get(`http://127.0.0.1:8000/api/tasks/${id}`, {
        headers: {
          Authorization: "Token 3e8dfb2e7aafdf6d2e69279b32a8e5af08d262f4",
        },
      })
      .then((res) => {
        setSelectedTask(res.data);
      });
  };
  const deleteTask = () => {
    axios
      .delete(`http://127.0.0.1:8000/api/tasks/${id}`, {
        headers: {
          Authorization: "Token 3e8dfb2e7aafdf6d2e69279b32a8e5af08d262f4",
        },
      })
      .then((res) => console.log(res));
  };

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {" "}
            {task.id} : {task.title}
          </li>
        ))}
      </ul>
      Set id <br />
      <input
        type="text"
        value={id}
        onChange={(evt) => {
          setId(evt.target.value);
        }}
      />
      <br />
      <button type="button" onClick={() => getTask()}>
        Get Task
      </button>
      <button type="button" onClick={() => deleteTask()}>
        Get Task
      </button>
      <h3>
        {selectedTask.id} : {selectedTask.title}
      </h3>
    </div>
  );
};

export default DrfApiFetch;
