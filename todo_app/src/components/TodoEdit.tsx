import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface TodoEditProps {
    initialTitle: string;
    onSave: (newTitle: string) => void;
    onCancel: () => void;
}

export const TodoEdit = ({ initialTitle, onSave, onCancel }: TodoEditProps) => {
    const [title, setTitle] = useState<string>(initialTitle);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        onSave(title);
    };
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={handleChange}
                placeholder="Edit todo"
            />
            <button type="submit"><FontAwesomeIcon icon={faSave} /></button>
            <button type="button" onClick={onCancel}><FontAwesomeIcon icon={faTimes} /></button>
        </form>
    );
};