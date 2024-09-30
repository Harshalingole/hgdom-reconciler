import { createVElementNode } from "../../../src/hgdom/createVElementNode.js";

const TodoItem = ({ todo, index, onRemoveTodo }) => {
  return createVElementNode(
    "li",
    { key: index, class: "todo-item" },
    createVElementNode("span", { class: "todo-text" }, todo),
    createVElementNode(
      "button",
      {
        onclick: () => onRemoveTodo(index),
        class: "todo-remove-btn",
      },
      "Remove"
    )
  );
};

export default TodoItem;
