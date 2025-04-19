import './Todos.css';

export function Todos({ todos, onComplete }) {
    return (
        <div className="todos-container">
            {todos.map(todo => (
                <div 
                    key={todo._id}
                    className={`todo-item ${todo.completed ? 'completed' : ''}`}
                >
                    <h1 className="todo-title"
                        style={{
                            textDecoration: todo.completed ? 'line-through' : 'none'
                        }}>
                        {todo.title}
                    </h1>
                    <p className="todo-description"
                        style={{
                            textDecoration: todo.completed ? 'line-through' : 'none'
                        }}>
                        {todo.description}
                    </p>
                    <button 
                        className={`complete-button ${todo.completed ? 'completed' : ''}`}
                        onClick={() => {
                            if (!todo.completed) {
                                onComplete(todo._id);
                            }
                        }}
                        disabled={todo.completed}
                    >
                        {todo.completed ? "Completed ✓" : "Mark as Complete"}
                    </button>
                </div>
            ))}
        </div>
    );
}