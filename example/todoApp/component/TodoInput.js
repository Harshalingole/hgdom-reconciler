import { createVElementNode } from "../../../src/hgdom/createVElementNode.js";

const TodoInput = ({ inputValue, onInputChange, onAddTodo }) => {
  return createVElementNode(
    "div",
    { class: "todo-input-container" },
    createVElementNode("input", {
      type: "text",
      value: inputValue,
      oninput: onInputChange,
      class: "todo-input",
    }),
    createVElementNode(
      "button",
      {
        onclick: onAddTodo,
        class: "todo-add-btn",
      },
      "Add Todo"
    )
  );
};

export default TodoInput;
