# HGDOM-Reconciler

A minimal reconciler, built to deep dive into understanding the working and implementation of modern web framework reconcilers like React.

## What is a Reconciler?

A reconciler is the core of modern web frameworks like React that manages how the UI (user interface) is updated efficiently when the state of the application changes. Rather than updating the entire DOM (which is slow and inefficient), a reconciler ensures that only the parts of the DOM that have changed are updated.

## How Does a Reconciler Work?

1. **Virtual DOM Creation**
   - The reconciler creates a virtual DOM representation of the UI.
   - It is a lightweight copy of the actual DOM.

2. **Diffing**
   - On application state changes, the reconciler creates a new virtual DOM and compares it with the previous one.

3. **Reconciliation (Patching)**
   - The reconciler identifies the smallest possible set of changes required to update the actual DOM and applies them.

4. **Commit Phase**
   - Finally, the reconciler updates the DOM with the necessary changes.

## Minimal Features of `hgdom-reconciler`

1. **Virtual DOM Representation**: Simulates a DOM structure using lightweight JavaScript objects.
2. **Diffing Algorithm**: Compares old and new Virtual DOM trees to detect changes.
3. **Patching**: Applies detected changes (add, remove, update) to the real DOM.
4. **Component-based Structure**: Reusable UI components that return Virtual DOM trees (not like React JSX feature).
5. **State-driven Re-rendering**: Basic state system that triggers a re-render and updates the DOM when the state changes.
