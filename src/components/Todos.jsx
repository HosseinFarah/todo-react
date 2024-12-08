import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";

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
  }

  return (
    <div className="container-fluid w-100 mt-5">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
        <h1 className="text-center mt-2 mb-5">Todos</h1>
        <Link to="/new" className="btn btn-primary mb-3"><i className="fas fa-plus"></i> Add New Todo</Link>
          <div className="row d-flex justify-content-center">
            {todos.map((todo) => (
              <div key={todo.id} className="col-12 col-sm-6 col-md-4 col-lg-6 mb-4">
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
                    <h5 className="card-title">{todo.title}</h5>
                  </div>
                  <div className="card-footer">
                    <p>{todo.status}</p>
                    <button className="btn btn-warning" onClick={() => navigate(`/todo/${todo.id}`)}><i className="fas fa-eye"></i></button>
                    <button className="btn btn-danger ms-1" onClick={() => deleteTodo(todo.id)}>
                      <i className="fas fa-trash"></i>
                    </button>

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
