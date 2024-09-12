import { createVElementNode } from "../src/hgdom/createVElementNode";

describe("Create Tree Node Representing Dom Element", () => {
  test("Empty Arguments", () => {
    expect(() => createVElementNode()).toThrow("Arguments are empty");
  });
  test("Type Argument Missing", () => {
    expect(() => createVElementNode(undefined, { id: "head" }, "Header"));
  });
  test("Text Node", () => {
    const result = {
      type: "p",
      props: {},
      children: [
        {
          type: "TEXT_ELEMENT",
          props: {},
          children: ["paragraph element"],
        },
      ],
    };
    expect(createVElementNode("p", {}, "paragraph element")).toEqual(result);
  });

  test("ELement with Attributes", () => {
    const result = createVElementNode(
      "div",
      { id: "main", class: "container" },
      "Main Container"
    );

    expect(result).toEqual({
      type: "div",
      props: { id: "main", class: "container" },
      children: [
        {
          type: "TEXT_ELEMENT",
          props: {},
          children: ["Main Container"],
        },
      ],
    });
  });

  test("Element with Multiple Children", () => {
    const result = createVElementNode(
      "ul",
      {},
      createVElementNode("li", {}, "Item 1"),
      createVElementNode("li", {}, "Item 2")
    );
    expect(result).toEqual({
      type: "ul",
      props: {},
      children: [
        {
          type: "li",
          props: {},
          children: [
            {
              type: "TEXT_ELEMENT",
              props: {},
              children: ["Item 1"],
            },
          ],
        },
        {
          type: "li",
          props: {},
          children: [
            {
              type: "TEXT_ELEMENT",
              props: {},
              children: ["Item 2"],
            },
          ],
        },
      ],
    });
  });

  test("Element with event Handlers", () => {
    const onButtonClick = () => "Button Click"
    const result = createVElementNode("div",{id: "main"},
      "Counter App",
      createVElementNode("button",{onClick: onButtonClick},"+")
    )

    expect(result).toEqual({
      type: "div",
      props: {id: "main"},
      children: [
        {
          type: "TEXT_ELEMENT",
          props: {},
          children: ["Counter App"]
        },
        {
          type: "button",
          props: {onClick: onButtonClick},
          children: [
            {
              type: "TEXT_ELEMENT",
              props: {},
              children: ["+"]
            }
          ]
        }
      ]
    })

    expect(result.children[1].props.onClick()).toBe("Button Click")
  })
});
