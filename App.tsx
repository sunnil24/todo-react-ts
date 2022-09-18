import * as React from 'react';
import './style.css';

const { useState, useEffect } = React;

interface TodoProps {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const App: React.FC<TodoProps> = () => {
  const [todos, setList] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos'
      );
      const data = await response.json();
      setList(data);
    })();
  }, []);

  const handDelete = (targetId: number): void => {
    const updatedList = todos.filter(({ id }: TodoProps) => id !== targetId);
    setList(updatedList);
  };

  return (
    <div>
      <h1>Todo App</h1>
      <ol>
        {todos.map(({ title, id, completed }: TodoProps) => (
          <li key={id}>
            <div className="todo-item">
              <span
                style={{
                  textDecoration: completed ? 'line-through' : 'inherit',
                }}
              >
                {title}
              </span>
              <button
                onClick={() => {
                  handDelete(id);
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default App;
