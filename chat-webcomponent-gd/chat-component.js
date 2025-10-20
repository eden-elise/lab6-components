import { getBotResponse } from '../eliza.js';


/**
 * ChatInterface Web Component with Shadow DOM
 * Fully encapsulated - styles and structure are self-contained
 */
class ChatInterface extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }


    connectedCallback() {
        this.shadowRoot.innerHTML = `
           ${this.getStyles()}
           ${this.getHTML()}
       `;


        this.setupElements();
        this.setupEventListeners();
        this.addMessage("Hello! How can I help you?", "bot");
    }


    /**
     * returns the CSS styles as a string
     * @returns {string} style tag with all CSS
     */
    getStyles() {
        return `
           <style>
               :host {
                   /* colors */
                   --color-cream: #FCF9EA;
                   --color-mint: #BADFDB;
                   --color-coral: #FFA4A4;
                   --color-pink: #FFD5D5;
                   --color-white: white;
                   --text-color: #333;
                   --border-color: #e0e0e0;
          
                   /* layout measurements */
                   --min-height-body: 100vh;
                   --body-padding: 1.25rem;
        
                   /* chat container */
                   --chat-max-width: 25rem;
                   --chat-height: 37.5rem;
                   --chat-width: 90%;
                   --chat-border-radius: .5rem;
        
                   /* messages */
                   --messages-gap: 1rem;
                   --message-padding: .75rem 1rem;
                   --message-border-radius: 1.125rem;
                   --message-corner-radius: .25rem;
                   --message-max-width: 80%;
         
                   /* input form */
                   --input-gap: .625rem;
                   --input-padding: .875rem 1.25rem;
                   --input-border-width: .125rem;
                   --input-border-radius: 1.5rem;
                   --input-font-size: 1rem;
        
                   /* button */
                   --button-size: 3rem;
                   --button-border-radius: 50%;
                   --button-font-size: 1.2rem;
          
                   /* effects */
                   --box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                   --focus-shadow: 0 0 0 0.2rem rgba(255, 164, 164, 0.25);
                   --hover-opacity: 0.8;
                   --line-height: 1.4;
          
                   /* scrollbar */
                   --scrollbar-width: 8px;
                   --scrollbar-track: #f1f1f1;
                   --scrollbar-thumb: #888;
                   --scrollbar-thumb-hover: #555;
                   --scrollbar-radius: 4px;
         
                   /* avatar */
                   --avatar-size: 2.5rem;
                   --avatar-font-size: 1.5rem;
          
                   /* timestamp */
                   --timestamp-font-size: .75rem;
                   --timestamp-color: #999;
                   --timestamp-padding: 0 .5rem;
          
                   /* message layout */
                   --message-gap: .75rem;
                   --content-gap: .25rem;
         
                   /* host box */
                   display: flex;
                   flex-direction: column;
                   width: var(--chat-width);
                   max-width: var(--chat-max-width);
                   height: var(--chat-height);
                   background-color: var(--color-white);
                   border-radius: var(--chat-border-radius);
                   box-shadow: var(--box-shadow);
                   overflow: hidden;
                   font-family: Arial, sans-serif;
                 }
          
                 /* reset inside shadow */
                 *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          
                 /* messages container */
                 .messages {
                   flex: 1;
                   overflow-y: auto;
                   padding: var(--body-padding);
                   display: flex;
                   flex-direction: column;
                   gap: var(--messages-gap);
                 }
          
                 /* message rows */
                 .message-bot, .message-user {
                   display: flex;
                   gap: var(--message-gap);
                   max-width: var(--message-max-width);
                   align-items: flex-start;
                 }
                 .message-bot { align-self: flex-start; }
                 .message-user { align-self: flex-end; flex-direction: row-reverse; }
          
                 /* avatar */
                 .message-avatar {
                   width: var(--avatar-size);
                   height: var(--avatar-size);
                   border-radius: 50%;
                   display: flex;
                   align-items: center;
                   justify-content: center;
                   font-size: var(--avatar-font-size);
                   flex-shrink: 0;
                   background: #fff; /* optional subtle bg */
                 }
          
                 /* content */
                 .message-content {
                   display: flex;
                   flex-direction: column;
                   gap: var(--content-gap);
                 }
                 .message-content p {
                   padding: var(--message-padding);
                   border-radius: var(--message-border-radius);
                   line-height: var(--line-height);
                   overflow-wrap: anywhere;
                   margin: 0;
                 }
                 .message-bot .message-content p {
                   background-color: var(--color-pink);
                   color: var(--text-color);
                   border-bottom-left-radius: var(--message-corner-radius);
                 }
                 .message-user .message-content p {
                   background-color: var(--color-mint);
                   color: var(--text-color);
                   border-bottom-right-radius: var(--message-corner-radius);
                 }
          
                 .message-timestamp {
                   font-size: var(--timestamp-font-size);
                   color: var(--timestamp-color);
                   padding: var(--timestamp-padding);
                 }
                 .message-user .message-timestamp { text-align: right; }
          
                 /* input form */
                 .input-form {
                   display: flex;
                   gap: var(--input-gap);
                   padding: var(--body-padding);
                   background-color: var(--color-cream);
                   border-top: 1px solid var(--border-color);
                 }
                 .input-form input {
                   flex: 1;
                   padding: var(--input-padding);
                   border: var(--input-border-width) solid var(--color-coral);
                   border-radius: var(--input-border-radius);
                   font-size: var(--input-font-size);
                   outline: none;
                   min-width: 0;
                 }
                 .input-form input:focus {
                   border-color: var(--color-coral);
                   box-shadow: var(--focus-shadow);
                 }
                 .input-form button {
                   width: var(--button-size);
                   height: var(--button-size);
                   background-color: var(--color-coral);
                   color: var(--color-white);
                   border-radius: var(--button-border-radius);
                   font-size: var(--button-font-size);
                   font-weight: bold;
                   cursor: pointer;
                   display: flex;
                   align-items: center;
                   justify-content: center;
                   border: none;
                   outline: none;
                 }
                 .input-form button:hover { opacity: var(--hover-opacity); }
          
                 /* custom scrollbar (WebKit) */
                 .messages::-webkit-scrollbar { width: var(--scrollbar-width); }
                 .messages::-webkit-scrollbar-track { background: var(--scrollbar-track); }
                 .messages::-webkit-scrollbar-thumb {
                   background: var(--scrollbar-thumb);
                   border-radius: var(--scrollbar-radius);
                 }
                 .messages::-webkit-scrollbar-thumb:hover { background: var(--scrollbar-thumb-hover); }
           </style>
       `;
    }

    /**
     * returns the HTML structure as a string
     * @returns {string} HTML markup
     */
    getHTML() {
        return `
           <div class="messages"></div>
           <form class="input-form">
               <input type="text" placeholder="Type a message..." autocomplete="off">
               <button type="submit">↑</button>
           </form>
       `;
    }


    /**
     * selects and stores DOM elements from shadow root
     */
    setupElements() {
        this.messagesContainer = this.shadowRoot.querySelector('.messages');
        this.form = this.shadowRoot.querySelector('.input-form');
        this.input = this.shadowRoot.querySelector('input');
    }

    /**
     * attaches event listeners
     */
    setupEventListeners() {
        this.form.addEventListener('submit', (event) => this.handleSubmit(event));
    }

    /**
     * handles form submission
     * @param {Event} event - the submit event
     */
    handleSubmit(event) {
        event.preventDefault();
        const uMessage = this.input.value.trim();

        if (uMessage === "") {
            return;
        }
        this.addMessage(uMessage, "user");

        this.input.value = "";
        const botResponse = getBotResponse(uMessage);
        setTimeout(() => {
            this.addMessage(botResponse, 'bot');
        }, 500);
    }

}

customElements.define("chat-interface", ChatInterface);
