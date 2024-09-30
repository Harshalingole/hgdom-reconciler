import { createVElementNode } from "../../src/hgdom/createVElementNode.js";
import { useState } from "../../src/hgdom/hooks/useState.js";
import TodoInput from "./component/TodoInput.js";
import TodoList from "./component/TodoList.js";

const App = {
  render: function () {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const onInputChange = (event) => {
      setInputValue(event.target.value);
    };

    const onAddTodo = () => {
      if (inputValue.trim() !== "") {
        // Using setState callback to modify todos based on the previous state
        setTodos((prevTodos) => [...prevTodos, inputValue]);
        setInputValue("");
      }
    };

    const onRemoveTodo = (index) => {
      setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
    };

    return createVElementNode(
      "div",
      { id: "todo-app", class: "todo-app-container" },
      createVElementNode("h1", { class: "todo-title" }, "Todo App"),
      TodoInput({ inputValue, onInputChange, onAddTodo }),
      TodoList({ todos, onRemoveTodo })
    );
  },
};

export default App;

