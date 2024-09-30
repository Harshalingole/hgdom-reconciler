import { createVElementNode } from "../../src/hgdom/createVElementNode.js";
import { useState } from "../../src/hgdom/hooks/useState.js";

const App = {
  render: function () {
    const [count, setCount] = useState(0);

    const onIncrementClick = () => {
      setCount(count + 1);
    };
    const onDecrementClick = () => {
      setCount(count - 1);
    };

    return createVElementNode(
      "div",
      { id: "app" },
      createVElementNode("h1", {}, "Counter App"),
      createVElementNode("p", {}, `Count: ${count}`),
      createVElementNode("button", { onclick: onIncrementClick }, "Increment"),
      createVElementNode("button", { onclick: onDecrementClick }, "Decrement")
    );
  },
};

export default App;
