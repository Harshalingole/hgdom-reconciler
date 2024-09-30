// ----- Render function--------- //

/*
Render function Overview

Redner function is responsible for converting the virutal dom into actual Dom element and inserting them into document.

#Intitution & Purpose
What we are implementing
a)Conversion: Translating a virtual Dom structure(javascript object) into actual Dom elements.
b)Insertion: Placing the generated Dom elements into specified container in the real Dom.

#Why we are Implementing this
a)Updating Real Dom: Virtual dom serves as lightweight representatin of the real dom. the render function takes this representation and makes changes to real dom.
b)Efficient Updates: By only updating parts of the real dom that have changed.

#Steps To Implement Render function:
1)Define the render(vNode, container) function
2)Traverse the vNode tree
3)convert each vNode to a Dom element
4)Assign Properties: Set Attributes , Evenet Listener
5)Append Children: recursively create real dom elements for each child node.
6)Attach To container

#Topics To Learn:
1)Dom Manipulation: Learn how to dynamically create and manipulate dom node.
2)Mapping Virtual Dom to Real Dom: How to translate virtual Dom (tree like structure) to acutal Dom.

#Resources:
1)Document Object Model (DOM): https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
  Cover below topic from above Mdn docs:
    a)Introduction to the DOM
    b)Using the Document Object Model
    c)Traversing an HTML table with JavaScript and DOM Interfaces
    d)Cover basic Dom manipulation techniques including:
        i)Locating DOM elements using selectors
        ii)createElement(),addEventListener(),setAttribute(),appendChild(),createTextNode()

*/

export let currentComponent = null;

export function renderComponent(component) {
  currentComponent = component;
  const vNode = component.render();
  const dom = createRealDom(vNode);  
  component.dom = dom;
  component.oldVNode = vNode;      
  // currentComponent = null;
  return dom;
}
/**
 * Render Initial virtual Dom tree into root container of app.
 * @param {HTML Element} container - Dom element to to render virutal dom into.
 * @param {object} newNode - An Object representing new virtual dom tree. 
 */

export function createRoot(container,initialNode){
  container.appendChild(renderComponent(initialNode))
}

/**
 * Create a real dom node element from virtual dom tree.
 * @param {Object} vNode- An Object representing virtual dom node tree
 * @returns {HTMLElement} - Created html element
 */

export function createRealDom(vNode){
  
  if(vNode.type === "TEXT_ELEMENT"){
    const domElement = document.createTextNode(vNode.children[0])
    vNode.dom = domElement
    return domElement
  }

  // create a new Dom element bsed on virtual node type.
  let domElement = document.createElement(vNode.type);

  // Attaching attributes and their properties to domElement based on virtual node props.
  Object.keys(vNode.props).forEach((propName) => {
    // Handling Attacing event props
    if(propName.startsWith("on")){
      const eventType = propName.toLowerCase().substring(2)
      domElement.removeEventListener(eventType,vNode.props[propName])
      domElement.addEventListener(eventType,vNode.props[propName])
    }
    // Handling special attribute style
    else if(propName === "style"){
      Object.assign(domElement.style,vNode.props[propName])
    }else{
      domElement.setAttribute(propName,vNode.props[propName])
    }
  })
  vNode.dom=domElement
  // Recursively create and append child elements
  vNode.children.forEach((child) => domElement.appendChild(createRealDom(child)))

  return domElement
}


