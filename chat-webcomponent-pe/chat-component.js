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

        const message = this.input.value.trim()

        if (message === "" ) {
            return;
        }

        this.addMessage(userMessage, "user");

        this.input.value = "";

        const botResponse = getBotResponse(message);
        setTimeout(() => {
            this.addMessage(botResponse, 'bot');
        }, 500);
    }


}