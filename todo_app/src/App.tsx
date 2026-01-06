import { useState, useEffect } from 'react';
import { BrowserRouter as Router, useRoutes, NavLink } from 'react-router-dom';
import { getRoutes } from './routes';
import { TodoCreateForm } from './components/TodoCreateForm';
import type { Todo } from './types';
import './App.css';

interface AppContentProps {
  todoProps: {
    todos: Todo[];
    toggleTodo: (id: string) => void;
    deleteTodo: (id: string) => void;
    editTodo: (id: string, title: string) => void;
  };
}

const AppContent = ({ todoProps }: AppContentProps) => {
  const element = useRoutes(getRoutes(todoProps));
  return element;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('my_todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('my_todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) return;
    const newTodo: Todo = { id: Date.now().toString(), title: input, completed: false, createdAt: Date.now() };
    setTodos([newTodo, ...todos]);
    setInput('');
  };

  const toggleTodo = (id: string) => setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  const deleteTodo = (id: string) => setTodos(prev => prev.filter(t => t.id !== id));
  const editTodo = (id: string, title: string) => setTodos(prev => prev.map(t => t.id === id ? { ...t, title } : t));

  const todoProps = { todos, toggleTodo, deleteTodo, editTodo };

  return (
    <Router>
      <div className="container">
        <header>
          <h1>My Todo App</h1>
          <TodoCreateForm input={input} onInputChange={(e) => setInput(e.target.value)} onAddTodo={addTodo} />
        </header>

        <nav className="nav-links">
          <NavLink to="/all">All Tasks</NavLink>
          <NavLink to="/completed">Completed</NavLink>
        </nav>

        <main>
          <AppContent todoProps={todoProps} />
        </main>
      </div>
    </Router>
  );
}

export default App;