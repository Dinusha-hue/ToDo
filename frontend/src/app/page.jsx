'use client';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setTodos,
  addTodo,
  removeTodo,
  updateTodo as updateTodoRedux,
} from '../store/features/todosSlice';
import {
  fetchTodos,
  createTodo,
  deleteTodo,
  updateTodo as updateTodoService,
} from '../services/todoService';

export default function Home() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    const loadTodos = async () => {
      const todos = await fetchTodos();
      dispatch(setTodos(todos));
    };
    loadTodos();
  }, [dispatch]);

  const handleAddTodo = async () => {
    if (text.trim() === '') return;
    const newTodo = await createTodo({ text, completed: false });
    dispatch(addTodo(newTodo));
    setText('');
  };

  const handleRemoveTodo = async (id) => {
    await deleteTodo(id);
    dispatch(removeTodo(id));
  };

  const handleToggleCompletion = async (todo) => {
    const updatedTodo = { ...todo, completed: !todo.completed };
    try {
      await updateTodoService(todo._id, updatedTodo);
      dispatch(updateTodoRedux(updatedTodo));
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  const handleEditTodo = async () => {
    const updatedTodo = { ...selectedTodo };
    try {
      await updateTodoService(selectedTodo._id, updatedTodo);
      dispatch(updateTodoRedux(updatedTodo));
      setSelectedTodo(null); 

      window.location.reload();
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col items-center justify-center p-4">
      <header className="bg-blue-500 text-white w-full py-6 text-center text-xl font-bold shadow-md">
        Todo
      </header>

      <div className="bg-white rounded-lg shadow-lg p-6 mt-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4 text-gray-700">Add a New Task</h2>
        <div className="flex items-center">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your task"
            required
            className="w-full px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            onClick={handleAddTodo}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mt-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4 text-gray-700">Your Tasks</h2>
        <ul className="space-y-3">
          {todos.length > 0 ? (
            todos.map((todo) => (
              <li
                key={todo._id}
                className={`flex justify-between items-center p-3 rounded-md ${
                  todo.completed ? 'bg-green-100' : 'bg-blue-100'
                }`}
                onClick={() => setSelectedTodo(todo)} 
              >
            <span>{todo.text}</span>
                <div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleCompletion(todo);
                    }}
                    className={`px-2 py-1 rounded-md ${
                      todo.completed ? 'bg-green-500' : 'bg-red-500'
                    } text-white`}
                  >
                    {todo.completed ? 'Complete' : 'In Complete'}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveTodo(todo._id);
                    }}
                    className="text-red-500 hover:text-red-700 transition ml-2"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No tasks available. Add some!</p>
          )}
        </ul>

      </div>

      {selectedTodo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-gray-700">Task Details</h2>
            <p className="mb-4">
              <strong>Task:</strong> {selectedTodo.text}
            </p>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                <strong>Status:</strong>
              </label>
              <select
                value={selectedTodo.completed ? 'true' : 'false'}
                onChange={(e) =>
                  setSelectedTodo({
                    ...selectedTodo,
                    completed: e.target.value === 'true',
                  })
                }
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="false">Not Completed</option>
                <option value="true">Completed</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleEditTodo}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Save
              </button>
              <button
                onClick={() => setSelectedTodo(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition ml-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
