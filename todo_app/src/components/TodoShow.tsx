import { useState } from 'react';
import { TodoEdit } from './TodoEdit';
import type { Todo } from '../types';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface TodoShowProps {
    todo: Todo;
    toggleTodo: (id: string) => void;
    deleteTodo: (id: string) => void;
    editTodo: (id: string, newTitle: string) => void;
}

export const TodoShow = ({ todo, toggleTodo, deleteTodo, editTodo }: TodoShowProps) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const handleSave = (newTitle: string) => {
        editTodo(todo.id, newTitle);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    return (
        <div className="todo-item">
            {isEditing ? (
                <TodoEdit
                    initialTitle={todo.title}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            ) : (
                <div className="todo-content">
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                    />

                    <span
                        onDoubleClick={() => setIsEditing(true)}
                        style={{ textDecoration: todo.completed ? 'line-through' : 'none', flex: 1 }}
                    >
                        {todo.title}
                    </span>

                    <div className="actions">
                        <button onClick={() => setIsEditing(true)}>
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </button>

                        <button onClick={() => deleteTodo(todo.id)} className="delete-btn">
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};