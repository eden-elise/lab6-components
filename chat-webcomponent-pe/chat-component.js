import { getBotResponse } from '../eliza.js';

class ChatComponent extends HTMLElement {
    constructor() {
        super()
    }
    connectedCallback() {
        this.messagesContainer = document.querySelector('.messages')
        this.form = this.querySelector('.input-form')
        this.input = this.querySelector('input')
        this.button = this.querySelector('button')

        this.form.addEventListener('submit', (event) => this.handleSubmit(event));
    }

    /**
     * handles form submission
     * @param {Event} event - The submit event
     */
    handleSubmit(event) {
        event.preventDefault()

        const uMessage = this.input.value.trim()

        if (uMessage === "" ) {
            return;
        }

        this.addMessage(uMessage, "user");

        this.input.value = "";

        const botResponse = getBotResponse(uMessage);
        setTimeout(() => {
            this.addMessage(botResponse, 'bot');
        }, 500);
    }

    /**
     * adds a message to the chat
     * @param {string} text - the message text
     * @param {string} type - 'user' v 'bot'
     */
    addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message-${type}`;
        messageDiv.textContent = text;

        this.messagesContainer.appendChild(messageDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
}
customElements.define("chat-component", ChatComponent);