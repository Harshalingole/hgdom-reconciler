import { diff } from "../diff.js";
import { currentComponent } from "../render.js";


export function useState(initialValue) {
  const component = currentComponent;
  component.state = component.state || initialValue;
  const setState = (newState) => {
    // console.log("setState click",newState)
    component.state = newState;
    reRenderComponent(component);
  };
  
  return [component.state, setState];
}

export function reRenderComponent(component) {
  const parentDom = component.dom.parentNode;
  const oldVNode = component.oldVNode;
  const newVNode = component.render();
  diff(oldVNode, newVNode, parentDom);
  component.oldVNode = newVNode;
}



