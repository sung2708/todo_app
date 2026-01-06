import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useParams, Navigate } from 'react-router-dom';
import type { Todo } from './types';
import { TodoList } from './components/TodoList';
import { TodoCreateForm } from './components/TodoCreateForm';
import './App.css';

interface TodoWrapperProps {
  todos: Todo[];
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, newTitle: string) => void;
}

const TodoWrapper = ({ todos, toggleTodo, deleteTodo, editTodo }: TodoWrapperProps) => {
  const { filter } = useParams();
  const filteredTodos = todos.filter((todo: Todo) => {
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <TodoList
      todos={filteredTodos}
      toggleTodo={toggleTodo}
      deleteTodo={deleteTodo}
      editTodo={editTodo}
    />
  );
};

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('my_todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [input, setInput] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('my_todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) return;
    const newTodo: Todo = {
      id: Date.now().toString(),
      title: input,
      completed: false,
      createdAt: Date.now(),
    }
    setTodos([newTodo, ...todos]);
    setInput('');
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const editTodo = (id: string, newTitle: string) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, title: newTitle } : t)));
  };

  return (
    <Router>
      <div className="container">
        <h1>My Todo App</h1>

        <TodoCreateForm
          input={input}
          onInputChange={(e) => setInput(e.target.value)}
          onAddTodo={addTodo}
        />

        <nav className="nav-links">
          <NavLink to="/all">All Tasks</NavLink>
          <NavLink to="/completed">Completed</NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/all" replace />} />
          <Route
            path="/:filter"
            element={
              <TodoWrapper
                todos={todos}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;