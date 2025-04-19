import { useState } from "react";

export function CreateTodo(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({});

    const validateFields = () => {
        const newErrors = {};
        if (!title.trim()) {
            newErrors.title = "Title is required";
        }
        if (!description.trim()) {
            newErrors.description = "Description is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return <div>
        <input 
            id="title" 
            style={{
                padding: 10,
                margin: 10,
                borderColor: errors.title ? 'red' : 'initial'
            }} 
            type="text" 
            placeholder="title" 
            value={title}
            onChange={(e) => {
                setTitle(e.target.value);
                setErrors({...errors, title: ''});
            }}
        />
        {errors.title && <div style={{ color: 'red', marginLeft: 10 }}>{errors.title}</div>}
        <br />

        <input 
            id="description" 
            style={{
                padding: 10,
                margin: 10,
                borderColor: errors.description ? 'red' : 'initial'
            }}
            type="text" 
            placeholder="description"
            value={description}
            onChange={(e) => {
                setDescription(e.target.value);
                setErrors({...errors, description: ''});
            }}
        />
        {errors.description && <div style={{ color: 'red', marginLeft: 10 }}>{errors.description}</div>}
        <br />
        
        <button 
            style={{
                padding: 10,
                margin: 10
            }} 
            onClick={async () => {
                if (!validateFields()) {
                    return;
                }

                try {
                    const response = await fetch("http://localhost:3000/todo", {
                        method: "POST",
                        body: JSON.stringify({
                            title,
                            description
                        }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });

                    if (!response.ok) {
                        throw new Error('Failed to create todo');
                    }

                    const json = await response.json();
                    alert("Todo added");
                    setTitle("");
                    setDescription("");
                    setErrors({});
                    props.onTodoCreated(); // Call the callback to refresh todos
                } catch (error) {
                    alert("Failed to add todo: " + error.message);
                }
            }}
        >
            Add a todo
        </button>
    </div>
}


