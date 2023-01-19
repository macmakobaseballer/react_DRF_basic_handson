import React, { useState, useEffect } from "react";
import axios from "axios";
import { editableInputTypes } from "@testing-library/user-event/dist/utils";

const DrfApiFetch = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState([]);
  const [editedTask, setEditedTask] = useState({ id: "", task: "" });
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

  const newTask = (task) => {
    const data = {
      title: task.title,
    };

    axios
      .post(`http://127.0.0.1:8000/api/tasks/`, data, {
        headers: {
          "content-type": "application/json",
          Authorization: "Token 3e8dfb2e7aafdf6d2e69279b32a8e5af08d262f4",
        },
      })
      .then((res) => setTasks([...tasks, res.data]));
  };

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
  const deleteTask = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/tasks/${id}`, {
        headers: {
          Authorization: "Token 3e8dfb2e7aafdf6d2e69279b32a8e5af08d262f4",
        },
      })
      .then((res) => {
        setTasks(tasks.filter((task) => task.id !== id));
        setSelectedTask([]);
      });
  };

  const handleInputChange = () => (evt) => {
    const value = evt.target.value;
    const name = evt.target.name;
    setEditedTask({ ...editedTask, [name]: value });
  };

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {" "}
            {task.id} {task.title}
            <button onClick={() => deleteTask(task.id)}>
              <i className="fas fa-trash-alt"></i>
            </button>
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
      <h3>
        {selectedTask.id} {selectedTask.title}
      </h3>
      <input
        type="text"
        name="title"
        value={editedTask.title}
        onChange={handleInputChange()}
        placeholder="New Task?"
        required
      />
      <button onClick={() => newTask(editedTask)}>Create </button>
    </div>
  );
};

export default DrfApiFetch;
