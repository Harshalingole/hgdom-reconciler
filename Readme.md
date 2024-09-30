# HGDOM-Reconciler

A minimal reconciler, built to deep dive into understanding the working and implementation of modern web framework reconcilers like React.
## Table of Contents

- [HGDOM-Reconciler](#hgdom-reconciler)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [What is a Reconciler?](#what-is-a-reconciler)
  - [How Does a Reconciler Work?](#how-does-a-reconciler-work)
  - [Features](#features)
  - [Minimal Features of `hgdom-reconciler`](#minimal-features-of-hgdom-reconciler)
  - [Installation](#installation)
  - [Usage](#usage)
  - [API](#api)
    - [createVElementNode](#createvelementnode)
    - [createRoot](#createroot)
    - [useState](#usestate)
  - [Contributing](#contributing)
  - [License](#license)


## Introduction

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

## Features

## Minimal Features of `hgdom-reconciler`

1. **Virtual DOM Representation**: Simulates a DOM structure using lightweight JavaScript objects.
2. **Diffing Algorithm**: Compares old and new Virtual DOM trees to detect changes.
3. **Patching**: Applies detected changes (add, remove, update) to the real DOM.
4. **Component-based Structure**: Reusable UI components that return Virtual DOM trees (not like React JSX feature).
5. **State-driven Re-rendering**: Basic state system that triggers a re-render and updates the DOM when the state changes implementing basic useState hook to manage state of component.

## Installation

To install `hgdom-reconciler`, you can use [npm](https://www.npmjs.com/):
```bash
npm install hgdom-reconciler
```

## Usage

Here’s a basic example of how to use `hgdom-reconciler` to create and render a virtual DOM:

```javascript
import { createVElementNode, render } from 'hgdom';

// Create a virtual DOM node
const vNode = createVElementNode('div', { id: 'container' }, 'Hello world');

// Render the virtual DOM node to the actual DOM
const container = document.getElementById('root');
createRoot(vNode, container);
```
You can look for Todo and Counter App example in example directory to get usage implementation idea.

## API

### createVElementNode
createVElementNodeCreates a virtual DOM representation of an HTML element.

```javascript
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
*/
const vNode = createVElementNode('div', { id: 'container' }, 'Hello world');
```

### createRoot
Translates a virtual DOM structure into actual DOM elements and places them into a specified container in the real DOM.

```javascript
/**
 * Render Initial virtual Dom tree into root container of app.
 * @param {HTML Element} container - Dom element to to render virutal dom into.
 * @param {object} newNode - An Object representing new virtual dom tree. 
 */

const container = document.getElementById('root');
createRoot(vNode, container);
```

### useState

```javascript
/**
 * Custome hook to manage state within a component similiar to of react
 * @param {any} initialValue - The initial state value. 
 * @returns {[any,function]} - An array containing the current state and a function to update the state.
 */
const [count, setCount] = useState(0);
```

## Contributing

I welcome contributions and suggestion from the community. To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature/bugfix using `git checkout -b <branchname>`.
3. Make your changes and commit them using `git commit -m "<commit message>"`.
4. Push your changes to your fork using `git push origin <branchname>`.
5. Create a pull request on the main repository and describe your changes.

## License

This project is licensed under the MIT License - see the `LICENSE.md` file for details.