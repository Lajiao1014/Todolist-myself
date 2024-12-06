'use client'
import { useState } from "react";
import { Provider } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo } from './store/todoSlice';
import { store } from './store/store';

// 創建一個新的 TodoList 組件
function TodoList() {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todoList.todos);

  const handleAddTodo = () => {
    if (inputValue !== '') {
      dispatch(addTodo(inputValue));
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  const complete = (index) => {
    dispatch(toggleTodo(index));
  };

  const handleDelete = (index) => {
    dispatch(deleteTodo(index));
  };

  return (
    <div className="custom-gradient h-[100vh] w-full flex justify-center items-center">
      <div className="w-[400px] min-h-[200px] rounded-lg bg-[#ffffff] flex flex-col items-center p-4">
        <div className="w-[350px] bg-[#ffffff]">
          <div className="flex">
            <div className="font-bold text-2xl text-black">
              To-Do List
            </div>
            <img src="/todo.png" className="w-[25px] h-[25px] m-[5px]" />
          </div>
          <div className="flex items-center justify-center bg-[#edeef0] rounded-[30px] pl-[20px] mb-[25px] mt-[10px] h-[30px]">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Add your text"
              className="flex-1 border-none outline-none bg-transparent p-[10px] text-[14px] text-black"
            />
            <button
              onClick={handleAddTodo}
              className="border-none outline-none px-[50px] bg-[#ff5945] text-white text-[16px] cursor-pointer rounded-[40px] h-[30px]"
            >
              Add
            </button>
          </div>

          <ul className="list-none p-0">
            {todos.map((todo, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-[#edeef0] rounded-[30px] pl-[20px] mb-[10px] h-[30px]"
              >
                <div className="flex items-center">
                  <img
                    src="/checkbox.png"
                    className={`w-[20px] h-[20px] mr-[5px] cursor-pointer ${todo.completed ? 'opacity-50' : ''}`}
                    onClick={() => complete(index)}
                  />
                  <span
                    className={`text-[14px] text-black ${todo.completed ? 'line-through text-gray-500' : ''}`}
                  >
                    {todo.text}
                  </span>
                </div>
                <button
                  onClick={() => handleDelete(index)}
                  className="border-none outline-none px-[20px] text-black text-[14px] cursor-pointer rounded-r-[30px] h-[30px]"
                >
                  x
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// 主頁面組件
export default function Home() {

  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
}
