//---------Virtual DOM Representation-------------//

/*
Create a helper function for representation of the Virtual DOM in JavaScript.

a)createVElementNode: represent an HTML element in actual Dom and Node of virutal dom tree that will be use to crate html element to dynamically insert in dom. similar to React.createElement()
#Topics to Learn:
1)Dom Vs Virtual Dom
2)Javascript Objects & Tress: how to represent dom structure as javascript object

#Resouces:
 Search for concept or asked chatgpt to expalain them.
*/

/** 
 *Create a Virtual Dom representation of an HTML Element. 
 * This function creates an object representing an html element in virtual dom tree.
 * It's similar to React.createElement but simplified for purpose of this minimal reconciler.
 * 
 * @param {string} type - The type of element example: div,span and other html element
 * @param {Object} [props={}] - The properties attributes of an html element
 * @param {...(string|number|vNode)} children - The child nodes of an element
 * @returns {Object} - A virtual Dom node representing an html element
 * 
 * @example
 * const vNode = createVElementNode('div',{id: container},'Hello world');
*/

export function createVElementNode(type,props={},...children){
  if(arguments.length === 0){
    console.log(arguments)
    throw new Error("Arguments are empty")
  }
  if(type === "undefined" || typeof type !== "string" ){
    throw new Error("element type is mising or its not type of string")
  }
  return {
    type: type,
    props: props,
    children: flatternChildren(children)
  }
}
// createVElementNode()
/**
 * Flattern an array of children and convert text nodes to virtual text nodes.
 * 
 * @param {(string|number|vNode)[]} children- The child node of an element
 * @returns {vNode[]} - An array of virtual Domes Node. 
 */
function flatternChildren(children){
  return children.flat().map((child) => 
    typeof child === "string" || typeof child === "number" ? createVTextNode(child) : child
  )
}


/**
 * Create Virtual Text Node
 * 
 * @param {string} text - The text content of virtual text node. 
 * @returns {Object} - A virutal dom node representing type of "TEXT_ELEMENT"
 */
function createVTextNode(text){
  return {
    type: "TEXT_ELEMENT",
    props: {},
    children: [text]
  }
}