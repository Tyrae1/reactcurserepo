import React, {useState, useEffect} from "react";
import Item from "./Item";

const TodoBox = () => {
    const [value, setValue] = useState("");
    const [items, setItems] = useState(() => {
        try {
            const data = localStorage.getItem('todos');
            return data? JSON.parse(data) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(items));
    }, [items]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const text = value.trim();
        if (!text) return;
        const newItem = {
            id: Date.now().toString(),
            text,
        };
        setItems((prev)=> [newItem, ...prev]);
        setValue("");
    };

    const handleRemove = (id) => {
        setItems(prev=> prev.filter(item => item.id !==id));
    };

    return (
        <div>
            <div className="mb-3">
                <form className="d-flex" onSubmit={handleSubmit}>
                    <div className="me-3 flex-grow-1">
                        <input
                            type="text"
                            value={value}
                            required
                            className="form-control"
                            placeholder="I am going..."
                    onChange={(e)=>setValue(e.target.value)}
                            />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Add
                    </button>
                </form>
            </div>
            {items.map((task)=>(
                <Item key={task.id} task={task} onRemove={handleRemove} />
            ))}
        </div>
    );
};
export default TodoBox;