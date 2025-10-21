#### COMP 305 - Software Design
## Lab 6: Chat Interface Component

-----

### Author: Eden Tripp
#### Last Updated: 10/20/2025

-----
The core functionality of this lab includes:

* Visually:
  * Displaying a conversation with distinct **user** (right-aligned) and **bot** (left-aligned) messages.
  * An input field and send button.
  * Bot logic using **Eliza-style pattern matching** for responses (provided via `eliza.js`).
  * Handling the **Enter key** for sending messages.
  * **Auto-scrolling** to display the latest message.
* 4 different approaches and a main page connecting them all
    * Static HTML\CSS
    * DOM Manipulation
    * Progressive Enhancement 
    * Web components/Graceful degradation

-----

##  Repository Structure

The project is organized into four subdirectories, each representing a different implementation of the chat interface:

```
lab6-components/
├── .idea/
├── chat-dom/
│   ├── index.html
│   ├── script.js (DOM manipulation logic)
│   └── styles.css
├── chat-prototype-html-css/
│   ├── index.html (Static structure)
│   └── styles.css (Visual design)
├── chat-webcomponent-gd/ (Graceful Degradation - Shadow DOM)
│   ├── index.html
│   └── chat-component.js
├── chat-webcomponent-pe/ (Progressive Enhancement - No Shadow DOM)
│   ├── index.html
│   ├── styles.css
│   └── chat-component.js
├── card.js 
├── eliza.js (Bot logic module)
├── index.html (Main navigation page)
├── LICENSE
├── main-styles.css
└── README.md
```

-----

## 🔗 Live Site

You can view the deployed project here: [will add later]

-----

## 💡 Component Approaches

| Directory | Approach | Core Technology | Encapsulation | Works without JS? | Key Concept |
| :--- | :--- | :--- | :--- |:------------------| :--- |
| **chat-prototype-html-css** | Static Prototype | HTML / CSS | None | Yes               | Visual design and semantic structure first. |
| **chat-dom** | DOM Manipulation | HTML / CSS / Vanilla JS | None | No                | Traditional method of manipulating the page directly. |
| **chat-webcomponent-pe** | Progressive Enhancement | Custom Element (No Shadow DOM) | Low (Styles Global) | Yes...ish         | Starts with semantic HTML, enhanced with JavaScript. |
| **chat-webcomponent-gd** | JS Required (Shadow DOM) | Custom Element (Shadow DOM) | High (Fully isolated) | No                | JavaScript required to create and render the component; fully self-contained. |

### 1\. Pure HTML and CSS Prototype (`chat-prototype-html-css`)

This is the **non-functional baseline**. It establishes the core **semantic HTML structure** and **CSS styling** for the chat interface. All messages are static, demonstrating the look and feel before any interactivity is added. This ensures the visual design and layout are sound.

### 2\. DOM Manipulation (`chat-dom`)

This is the **standard interactive version**. It uses **vanilla JavaScript** to dynamically create, add, and remove message elements by manipulating the global Document Object Model (DOM). It implements the full Eliza-style bot logic and event handling.

### 3\. Web Component: Progressive Enhancement (`chat-webcomponent-pe`)

This approach leverages **Web Components** to create a `<simple-chat>` custom element.

* It starts with **semantic HTML markup** *inside* the custom tag in `index.html`.
* The `chat-component.js` code then finds and **enhances** this existing markup with JavaScript behavior (listeners, bot logic).
* It **does not use Shadow DOM**, meaning styles are global, but the component's basic content remains visible and usable even if JavaScript fails to load.

### 4\. Web Component: JavaScript Required (`chat-webcomponent-gd`)

This approach demonstrates a **fully encapsulated** component using the **Shadow DOM**.

* The custom element (`<chat-interface>`) is created via **JavaScript entirely**.
* All HTML structure and **styles are generated and isolated** within the Shadow DOM, preventing style leakage in or out.
* This approach offers the highest **reusability** and **encapsulation** but requires JavaScript to render the component structure at all (i.e., it does not degrade gracefully).

-----

## Reflections on the Approaches

### Challenges

* **Index page `card.js`**
    * *Issue:* Understanding how to implement, especially issues with Style function, **WebStorm “Cannot resolve custom property” warnings**

    * *What happened:* WebStorm flagged Shadow DOM CSS vars (e.g., `--hover-lift`) as unresolved when defined inside JS template strings.
    * *Fix:* Browser was fine; it’s an IDE limitation with Shadow DOM + template literals.

* **Picking CSS variables**

    * *Issue:* What properties deserve to be given variables, what does not? 
    * *Fix:* Variables for things that may need to change in the future or are repeating frequently: spacing (`--card-padding`, `--description-margin`), colors (`--badge-bg`), type sizes, and micro-interactions (`--transition-speed`, `--link-gap`).
    * *My Takeaway:* If I may need to tweak it later, make it a var.