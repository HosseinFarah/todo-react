import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewTodo = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);


  const addTodo = (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const status = document.getElementById("status").value;
    if (!title || !status) {
      alert("Please fill out all fields");
      return;
    }
    axios
      .post("http://localhost:5000/todos", {
        title,
        status,
      })
      .then((response) => {
        setTodos([...todos, response.data]);
        document.getElementById("title").value = "";
        document.getElementById("status").value = "";
        navigate("/");
      });
  };

  return (
    <div className="container">
        <>
          <div className="row d-flex justify-content-center mb-5">
            <h2>
              {" "}
              <i className="fas fa-plus"></i> Add new todo
            </h2>
            <form className="col-8" onSubmit={addTodo}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <textarea
                  className="form-control"
                  id="title"
                  rows="3"
                  required
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="status" className="form-label">
                  Status
                </label>
                <select className="form-select" id="status" required>
                <option value="" disabled selected>Select status</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
            </form>
          </div>
        </>
    </div>
  );
};

export default NewTodo;
