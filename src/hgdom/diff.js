//------ Diff Algorithm------//

import { createRealDom } from "./render";

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


function diff(previousVNode, newVNode, parentDom, index = 0) {
  let currentDomNode = parentDom.childNode[index];
  // Check Node differences
  if (!previousVNode) {
    const newDomElement = createRealDom();
    parentDom.appendChild(newDomElement);
  } else if (!newVNode) {
    parentDom.removeChild(currentDomNode);
  } else if (previousVNode.type !== newVNode.type) {
    const newDomLement = createRealDom(newVNode);
    parentDom.replaceChild(newDomLement, currentDomNode);
  } else if (
    previousVNode.type === "TEXT_ELEMENT" &&
    currentDomNode.type === "TEXT_ELEMENT"
  ) {
    if (previousVNode.children[0] !== newVNode.children[0]) {
      currentDomNode.nodeValue = newVNode.children[0];
    }
  } else {
    // check attributes differnces & Updated the attribute as needed
    updateAttributes(previousVNode, newVNode, currentDomNode, index);

    // Recursively applying diff on children
    const oldChildren = previousVNode.children || [];
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

export default diff;
