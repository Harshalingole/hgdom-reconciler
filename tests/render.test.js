/**
 * @jest-environment jsdom
 */
import { createVElementNode } from "../src/hgdom/createVElementNode"
import { createRealDom } from "../src/hgdom/render"

describe("Converting Virtual Dom Tree Into Real Dom Elements",() => {
  test("should convert a basic virtual Dom node to real Dom element", () => {
    const vNode = createVElementNode("p",{},"paragraph element")
    const result = createRealDom(vNode)
    expect(result.tagName).toBe("P")
    expect(result.textContent).toBe("paragraph element")
  })

  test("virtual dom node with basic attributes to real Dom element", () => {
    const vNode = createVElementNode(
      "div",
      { id: "main", class: "container" },
      "Main Container"
    );
    const result = createRealDom(vNode)
    expect(result.tagName).toBe("DIV")
    expect(result.getAttribute('id')).toBe("main")
    expect(result.getAttribute('class')).toBe("container")
    expect(result.textContent).toBe("Main Container")
  })

  test("virtual dom node with Multiple Children to real dom element", () => {
    const vNode = createVElementNode(
      "ul",
      {},
      createVElementNode("li", {}, "Item 1"),
      createVElementNode("li", {}, "Item 2")
    );
    const result = createRealDom(vNode)
    expect(result.tagName).toBe("UL")
    expect(result.getAttributeNames().length).toBe(0)
    expect(result.childElementCount).toBe(2)
    const children = result.children
    const childTagName = ["LI","LI"]
    const childTextContent = ["Item 1","Item 2"]
    for(let i=0; i < 2; i++){
      expect(children[i].tagName).toBe(childTagName[i])
      expect(children[i].getAttributeNames().length).toBe(0)
      expect(children[i].textContent).toBe(childTextContent[i])
      expect(children[i].childElementCount).toBe(0)
    }
  })

  test("virtual dom node with event Handlers to real dom element", () => {
    const onButtonClick = () => "Button Click"
    const vNode = createVElementNode("div",{id: "main"},
      "Counter App",
      createVElementNode("button",{onClick: onButtonClick},"+")
    )
    const result = createRealDom(vNode)
    expect(result.tagName).toBe("DIV")
    expect(result.firstChild.textContent.trim()).toBe("Counter App")
    expect(result.childElementCount).toBe(1)
    const button = result.querySelector("button")
    expect(button.tagName).toBe("BUTTON")
  })
})