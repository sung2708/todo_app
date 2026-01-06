import { useParams } from 'react-router-dom';
import { TodoList } from './TodoList';
import type { Todo } from '../types';

type TodoContainerProps = {
    todos: Todo[];
    toggleTodo: (id: string) => void;
    deleteTodo: (id: string) => void;
    editTodo: (id: string, text: string) => void;
};

export const TodoContainer = ({ todos, toggleTodo, deleteTodo, editTodo }: TodoContainerProps) => {
    const { filter } = useParams<{ filter: string }>();

    const filteredTodos = todos.filter((todo) => {
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