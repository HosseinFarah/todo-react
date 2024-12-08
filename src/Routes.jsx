import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Todos from './components/Todos';
import Todo from './components/Todo';
import NewTodo from './components/NewTodo';

const Router = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/todo" element={<Todos />} />
            <Route path="/todo/:id" element={<Todo />} />
            <Route path="/new" element={<NewTodo />} />
            <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
        </BrowserRouter>
    );
    }

export default Router;