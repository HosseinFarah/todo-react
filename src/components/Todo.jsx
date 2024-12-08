import { useParams,useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Todo = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [todo, setTodo] = useState({});
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        axios.get(`http://localhost:5000/todos/${id}`).then((response) => {
            setTodo(response.data);
            setLoading(false);
        });
    }, [id]);

    const deleteTodo = (e) => {
        e.preventDefault();
        if (!window.confirm("Are you sure you want to delete this todo?")) {
            return;
        }

        axios.delete(`http://localhost:5000/todos/${id}`).then(() => {
            navigate("/");
        });
    }

    const updateTodo = (e) => {
        e.preventDefault();
        if (!todo.title || !todo.status) {
            document.getElementById("titleHelp").classList.remove("d-none");
            return;
        }
        axios.put(`http://localhost:5000/todos/${id}`, todo).then((response) => {
            setTodo(response.data);
            navigate("/");
        }
        );
    }





    return (
        <div className="container ms-5">
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <>
                    <div className="row d-flex justify-content-center mb-5">
                        <h2>
                            {" "}
                            <i className="fas fa-info"></i> Todo details
                        </h2>
                    </div>
                    <form className="col-8">
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">
                                Title
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                value={todo.title}
                                onChange={(e) => setTodo({...todo, title: e.target.value})}
                                required
                            />
                            <div id="titleHelp" className="form-text d-none text-danger">
                                Enter the title of the todo
                                </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="status" className="form-label">
                                Status
                            </label>
                            <select className="form-select" id="status" value={todo.status} onChange={(e) => setTodo({...todo, status: e.target.value})} required>
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                            <div id="titleHelp" className="form-text d-none text-danger">
                                Select the status of the todo
                                </div>

                        </div>
                        <button className="btn btn-primary" onClick={updateTodo}>Update</button>
                        <button
                            className="btn btn-danger"
                            onClick={deleteTodo}
                        >
                            Delete
                        </button>
                        <button className="btn btn-secondary mt-1" onClick={() => navigate(`/`)}>	Back to Todos</button>
                    </form>
                </>
            )}
        </div>
    );
}

export default Todo;