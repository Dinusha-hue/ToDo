import { createSlice } from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    setTodos: (state, action) => {
      return action.payload;
    },
    toggleTodo: (state, action) => {
      const todo = state.find((t) => t._id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo: (state, action) => {
      return state.filter((todo) => todo._id !== action.payload);
    },
    updateTodo: (state, action) => {
      const { id, updatedData } = action.payload;
      const todoIndex = state.findIndex((t) => t._id === id);
      if (todoIndex !== -1) {
        state[todoIndex] = { ...state[todoIndex], ...updatedData };
      }
    },
  },
});

export const { addTodo, setTodos, toggleTodo, removeTodo, updateTodo } = todosSlice.actions;
export default todosSlice.reducer;
