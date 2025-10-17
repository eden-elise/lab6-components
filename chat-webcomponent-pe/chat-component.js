import { getBotResponse } from '../eliza.js';

//new type of HTMLElement based on the built-in HTMLElement class
class ChatComponent extends HTMLElement {
    constructor() {
        super() //inherits basic abilities of HTML element
    }
    connectedCallback() {
        //this. refers to <simple-chat>
        this.messagesContainer = this.querySelector('.messages')
        this.form = this.querySelector('.input-form')
        this.input = this.querySelector('input')

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
     * creates an avatar element for a message
     * @param {string} type - 'user' v 'bot'
     * @returns {HTMLElement} the avatar div element
     */
    createAvatar(type) {
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';

        const avatarIcon = document.createElement('span');
        avatarIcon.textContent = type === 'user' ? '😊' : '🤖';

        avatarDiv.appendChild(avatarIcon);
        return avatarDiv;
    }

    /**
     * creates a timestamp element with the time
     * @returns {HTMLElement} a time element with formatted time stamp
     */
    createTimestamp() {
        const timestamp = document.createElement("time");
        timestamp.className = 'message-timestamp';
        const now = new Date();
        timestamp.textContent = now.toLocaleTimeString('en-US', {
            hour: "numeric",
            minute: "2-digit",
        })
        timestamp.setAttribute("datetime", now.toISOString());
        return timestamp;
    }

    /**
     * forms the message (text + timestamp)
     * @param {string} text - the message text
     * @returns {HTMLElement} the content div element
     */
    createMessageContent(text) {
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';

        const textP = document.createElement('p');
        textP.textContent = text;

        contentDiv.appendChild(textP);
        contentDiv.appendChild(this.createTimestamp());

        return contentDiv;
    }

    /**
     * adds a message to the chat
     * @param {string} text - the message text
     * @param {string} type - 'user' v 'bot'
     */
    addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message-${type}`;

        messageDiv.appendChild(this.createAvatar(type));
        messageDiv.appendChild(this.createMessageContent(text));

        this.messagesContainer.appendChild(messageDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
}
customElements.define("chat-component", ChatComponent);