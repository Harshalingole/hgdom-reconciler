import { diff } from "../diff.js";
import { currentComponent } from "../render.js";

let currentHookIndex = 0; // Track the current hook index
const hooks = [];
/**
 * Custome hook to manage state within a component similiar to of react
 * @param {any} initialValue - The initial state value. 
 * @returns {[any,function]} - An array containing the current state and a function to update the state.
 */
export function useState(initialValue) {
  // Check if the hook at currentHookIndex exists, otherwise initialize it
  const hook = hooks[currentHookIndex] || {
    component: currentComponent,
    state: initialValue,
    setState: function (newState) {
      if (typeof newState === "function") {
        this.state = newState(this.state); // Functional update
      } else {
        this.state = newState; // Direct update
      }
      reRenderComponent(this.component); // Re-render on state update
    }
  };

  // If this is the first render (i.e., hook isn't initialized), store it
  if (!hooks[currentHookIndex]) {
    hooks.push(hook);
  }
  // Return the state and setState function for the current hook
  const returnValue = [hook.state, hook.setState.bind(hook)];

  // Increment the hook index for the next hook
  currentHookIndex++;

  return returnValue;
}

/**
 * Re-render the given component by performing a dif bet the old and new virtual dom
 * @param {Object} component - The specific component to be re-renderd
 */
export function reRenderComponent(component) {
  // Reset the hook index at the beginning of each render crucial to keep track to not re-create exiting hook on re-render as on re-render same hook will get call
  currentHookIndex = 0;
  const parentDom = component.dom.parentNode;
  const oldVNode = component.oldVNode;
  const newVNode = component.render();
  diff(oldVNode, newVNode, parentDom); 
  component.oldVNode = newVNode;
}
