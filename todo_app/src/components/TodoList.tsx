import { TodoShow } from './TodoShow';
import type { Todo } from '../types';

interface Props {
  todos: Todo[];
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, newTitle: string) => void;
}

export const TodoList = ({ todos, toggleTodo, deleteTodo, editTodo }: Props) => {
  const sortedTodos = [...todos].sort((a, b) => b.createdAt - a.createdAt);
  return (
    <div className="todo-list">
      {sortedTodos.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888' }}>No tasks found!</p>
      ) : (
        sortedTodos.map((todo) => (
          <TodoShow
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        ))
      )}
    </div>
  );
};