//------ Diff Algorithm------//

import { createRealDom } from "./render.js";

/* Implementing the Diffing Algorithm
Diffing is concept of comparing two version of virtual Dom tree (the previous one and the new one)
and identifying changes between them.

Key Differnces to Handle:
1)Node type Change
  :-if node type is differnt(eg: div VS span) old one need to replace entirely.
2)Attribute Changes
  :-if the attribute (eg: id,class,onclick) are different,you need to update only the atribute that have change
3)Text Content Changes
  :-if the text content of node has changes, update the text content in the dom
4)Node Addtion or Removal
  :-if new nodes are added or old nodes are removed, need to add or remove nodes accordingly in the real Dom.
*/


export function diff(oldVNode, newVNode, parentDom, index = 0) {
  // get the current dom node from the parentDom's children
  let currentDomNode = parentDom.childNodes[index];
  // 1)if oldVNode not exist add newVNode
  if (!oldVNode) {
    const newDom = createRealDom(newVNode);
    // newVNode.dom = newDom
    parentDom.appendChild(newDom);
  }
  // 2)if newVNode doesn't exist, remove the oldVNode from the Dom
  else if (!newVNode) {
    parentDom.removeChild(currentDomNode);
  }
  // 3) if the types are differnt, remove the old types with newOne
  else if (oldVNode.type !== newVNode.type) {
    const newDom = createRealDom(newVNode);
    // newVNode.dom = newDom
    parentDom.replaceChild(newDom, currentDomNode);
  } else if (
    oldVNode.type === "TEXT_ELEMENT" &&
    newVNode.type === "TEXT_ELEMENT"
  ) {
    if (
      typeof oldVNode.children[0] === "string" &&
      typeof newVNode.children[0] === "string" &&
      oldVNode.children[0] !== newVNode.children[0]
    ) {
      currentDomNode.nodeValue = newVNode.children[0];
    }
  }
  // 4)if node type is same, check for attribute and child differnces
  else {
    // Update the attributes if needed
    updateAttributes(oldVNode, newVNode, currentDomNode);

    // Recursively applying diff on children
    const oldChildren = oldVNode.children || [];
    const newChildren = newVNode.children || [];

    const max = Math.max(oldChildren.length, newChildren.length);

    for (let i = 0; i < max; i++) {
      diff(oldChildren[i], newChildren[i], currentDomNode, i);
    }
  }
}

function updateAttributes(oldVNode, newVNode, domElement) {
  const oldProps = oldVNode.props || {};
  const newProps = newVNode.props || {};

  Object.keys(newProps).forEach((prop) => {
    if (prop.startsWith("on")) {
      if (newProps[prop] !== oldProps[prop]) {
        const eventType = prop.toLowerCase().substring(2);
        domElement.removeEventListener(eventType, oldProps[prop]);
        domElement.addEventListener(eventType, newProps[prop]);
      } else {
        if (prop === "value" || prop === "check") {
          domElement[prop] = newProps[prop];
        } else {
          // Update attributes if their values are different
          if (newProps[prop] !== oldProps[prop]) {
            domElement.setAttribute(prop, newProps[prop]);
          }
        }
      }
    }
  });

  Object.keys(oldProps).forEach((prop) => {
    // if newProp prop does't contain oldProp prop, remove those prop from domElement
    if (!newProps.hasOwnProperty(prop)) {
      if (prop.startsWith("on")) {
        const eventType = prop.toLowerCase().substring(2);
        domElement.removeEventListener(eventType, oldProps[prop]);
      } else {
        domElement.removeAttribute(prop);
      }
    }
  });
}
