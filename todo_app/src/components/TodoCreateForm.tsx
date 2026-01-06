import React from 'react';

export interface TodoCreateFormProps {
  input: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddTodo: (title: string) => void;
}

export const TodoCreateForm = ({ input, onInputChange, onAddTodo }: TodoCreateFormProps) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        onAddTodo(input);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                id="input"
                type="text"
                value={input}
                onChange={onInputChange}
                placeholder="New todo"
            />
            <button type="submit">Add Todo</button>
        </form>
    );
};