import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const Todos = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/todos");
        setTodos(response.data);
        setLoading(false);
      }
      catch (error) {
        console.error(error);
      }
    }
    fetchTodos();
  }
  , []);

  const deleteTodo = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this todo?")) {
        await axios.delete(`http://localhost:5000/todos/${id}`);
        setTodos(todos.filter(todo => todo.id !== id));
      }
    }
    catch (error) {
      console.error(error);
    }
  }

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

  const columns = [
    { headerName: "ID", field: "id", sortable: true, filter: true },
    { headerName: "Title", field: "title", sortable: true, filter: true },
    { headerName: "Completed", field: "completed", sortable: true, filter: true },
  ];

  const onRowClicked = (row) => {
    navigate(`/todo/${row.data.id}`);
  }

  let info = `This is a simple Todo application. You can add, edit, delete and search todos. Click on the "Add New Todo" button to add a new todo. Click on the "Edit" button to edit a todo. Click on the "Delete" button to delete a todo. You can also search todos by title or status.`;

  const [fullText, setFullText] = useState(false);

  const toggleFullText = () => {
    setFullText(!fullText);
  };

  if (!fullText) {
    info = info.slice(0, 100) + "...";
  }

  return (
    <div className="container ms-5">
      {loading && <p>Loading...</p>}
      <h1>Todos</h1>
      <Link to="/new"><i className="fa fa-plus"></i> Add New Todo</Link>
      <input
        type="text"
        className="form-control my-3"
        placeholder="Search todos..."
        onChange={search}
      />
      <hr />
      <div className="row">
        {todos && todos.map(todo => (
          <div key={todo.id} className="col-sm-12 col-md-6 col-lg-6">
            <div className="card mb-4">
              <div className={`card-header ${todo.status === "completed" ? "bg-success text-white" : todo.status === "in-progress" ? "bg-warning text-white" : "bg-danger text-white"}`}>
                {todo.id}
              </div>
              <div className="card-body">
                <h5 className="card-title">{todo.title}</h5>
                <p className="card-text">Status: {todo.status}</p>
                <hr />
                <div className="d-flex justify-content-end">
                  <Link to={`/todo/${todo.id}`} className="btn btn-primary"><i className="fa fa-edit"></i></Link>
                  <button className="btn btn-danger ms-2" onClick={() => deleteTodo(todo.id)}><i className="fa fa-trash"></i></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <hr />
      <br />
      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          rowData={todos}
          columnDefs={columns}
          onRowClicked={onRowClicked}
          pagination={true} 
          paginationPageSize={5}
        />
      </div>
      <br />
      <footer className="footer">
        <p>{info}<button className="btn btn-primary" onClick={toggleFullText}>{fullText ? "Read Less" : "Read More"}</button></p>
        
      </footer>
    </div>
  );
}

export default Todos;
