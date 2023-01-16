import React, { useState, useEffect } from "react";
import axios from "axios";

const DrfApiFetch = () => {
  const [tasks, setTasks] = useState([]);

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

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.id}:{task.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DrfApiFetch;
