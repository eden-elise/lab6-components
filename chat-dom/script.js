import {getBotResponse} from "./eliza.js";

const chatMessages = document.getElementById("chatMessages");
const messageInput = document.getElementById("messageInput");
const chatForm = document.getElementById("inputForm");


/**
 * creates an avatar element for the chat message
 * @param {string} type - the message type(bot or user)
 * @returns {HTMLElement} the avatar div element with avatar
 */
function createAvatar(type) {
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';

    const avatarIcon = document.createElement('span');
    avatarIcon.className = 'avatar-icon';
    avatarIcon.textContent = type === 'user' ? '😊' : '🤖'; //if type =user use smiley else use robot

    avatarDiv.appendChild(avatarIcon);
    return avatarDiv;
}

/**
 * creates a timestamp element with the time
 * @returns {HTMLElement} a time element with formatted time stamp
 */
function createTimestamp() {
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
 * Creates the content section of a message (message and timestamp)
 * @param {string} text - the message
 * @returns {HTMLElement} - the content div containing text and timestamp
 */
function createMessage(text) {
    const contentDiv = document.createElement("div");
    contentDiv.className="message-content";

    const textParagraph = document.createElement("p");
    textParagraph.className = "message-text";
    textParagraph.textContent = text;

    contentDiv.appendChild(textParagraph);
    contentDiv.appendChild(createTimestamp());
    return contentDiv;
}

/**
 * adds a message to the interface
 * @param {string} text - the message
 * @param {string} type - user or bot
 */
function addMessage(text, type) {
    const messageArticle = document.createElement("article");
    messageArticle.className = `message ${type}-messages`;

    messageArticle.appendChild(createAvatar(type));
    messageArticle.appendChild(createMessage(text));
    chatMessages.appendChild(messageArticle);
    chatMessages.scrollTop = chatMessages.scrollHeight; //autoscroll to bottom
}

/**
 * handles the form submission event(sending a message)
 * @param event - the form submit event
 */
function formSubmit(event) {
    event.preventDefault(); //prevents page reload and loss of chat messages

    const userMessage = messageInput.value.trim(); //remove whitespace at beginning and end

    if (userMessage==="") {
        return;
    }

    addMessage(userMessage, 'user');

    messageInput.value="";

    const botResponse = getBotResponse(userMessage);

    setTimeout(()=> {
        addMessage(botResponse, 'bot');
    }, 500)
}

chatForm.addEventListener("submit", formSubmit);

addMessage("Hi! How are you today?", "bot");

