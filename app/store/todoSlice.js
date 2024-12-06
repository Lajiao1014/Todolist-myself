import { createSlice } from '@reduxjs/toolkit'

const todoSlice = createSlice({
    name: 'todoList',
    initialState: {
        todos: []
    },
    reducers: {
        addTodo: (state, action) => {
            state.todos.push({
                text: action.payload,
                completed: false
            })
        },
        toggleTodo: (state, action) => {
            state.todos[action.payload].completed = !state.todos[action.payload].completed
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter((_, index) => index !== action.payload)
        }
    }
})

export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions
export default todoSlice.reducer 