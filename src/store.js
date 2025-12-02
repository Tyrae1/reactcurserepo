import {configureStore, createSlice} from "@reduxjs/toolkit";

const loadTodosFromLocalStorage = () => {
    try {
        const serialized = localStorage.getItem("todos");
        if (!serialized) return [];
        return JSON.parse(serialized);
    } catch (e) {
        console.error("Failed to load Todos from LocalStorage", e);
        return [];
    }
};

const initialState = {
    todos: loadTodosFromLocalStorage(),
};

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo(state, action) {
            state.todos.push(action.payload);
        },
        toggleTodo(state, action) {
            const id = action.payload;
            const todo = state.todos.find(t => t.id === id);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        deleteTodo(state, action) {
            const id = action.payload;
            state.todos = state.todos.filter(t => t.id === id);
    },
    clearCompleted(state) {
        state.todos = state.todos.filter(t => !t.completed);
    },
},
});

export const { addTodo, toggleTodo, deleteTodo, clearCompleted} = todoSlice.actions;

export const store = configureStore({
    reducer: {
        todoState: todoSlice.reducer,
    },
});

store.subscribe(() => {
    try {
        const state = store.getState();
        const serialized = JSON.stringify(state.todoState.todos);
        localStorage.setItem("todos", serialized);
    } catch (e) {
        console.error("Failed to load Todos from LocalStorage", e);
    }
});