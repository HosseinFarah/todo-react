import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Todos = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/todos").then((response) => {
      setTodos(response.data);
      setLoading(false);
    });
  }, []);

  const deleteTodo = (id) => {
    if (!window.confirm("Are you sure you want to delete this todo?")) {
      return;
    }

    axios.delete(`http://localhost:5000/todos/${id}`).then(() => {
      setTodos(todos.filter((todo) => todo.id !== id));
    });
  };

  const search = (e) => {
    const query = e.target.value.toLowerCase();
    axios.get(`http://localhost:5000/todos`).then((response) => {
      const filteredTodos = response.data.filter(
        (todo) =>
          todo.title.toLowerCase().includes(query) ||
          todo.status.toLowerCase().includes(query)
      );
      setTodos(filteredTodos);
    });
  };

  return (
    <div className="container-fluid w-100 mt-5">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1 className="text-center mt-2 mb-5">Todos</h1>
          <div className="row d-flex mb-3">
            <Link to="/new" className="btn btn-primary mb-2 ms-4 w-25">
              <i className="fas fa-plus"></i> Add New Todo
            </Link>
            <form className="d-flex w-100">
              <input
                type="search"
                className="form-control me-2"
                placeholder="Search Todos"
                onChange={search}
              />
            </form>
          </div>
          <div className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1">
            {todos.map((todo) => (
              <div key={todo.id} className="col mb-4">
                <div className="card h-100">
                  <div
                    className={`card-header ${
                      todo.status === "completed"
                        ? "bg-success"
                        : todo.status === "pending"
                        ? "bg-info"
                        : "bg-warning"
                    }`}
                  >
                    {todo.title}
                  </div>
                  <div className="card-body">
                    <h5 className="card-title"> {todo.title}</h5>
                  </div>
                  <div className="card-footer d-flex justify-content-between">
                    <p className="mb-0">{todo.status}</p>
                    <div>
                      <button
                        className="btn btn-warning me-1"
                        onClick={() => navigate(`/todo/${todo.id}`)}
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteTodo(todo.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Todos;
