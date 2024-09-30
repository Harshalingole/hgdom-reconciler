import { createVElementNode } from "../../../src/hgdom/createVElementNode.js";
import TodoItem from "./TodoItem.js";

const TodoList = ({ todos, onRemoveTodo }) => {
  return createVElementNode(
    "ul",
    { class: "todo-list" },
    todos?.map((todo, index) =>
      TodoItem({ todo, index, onRemoveTodo })
    )
  );
};

export default TodoList;
