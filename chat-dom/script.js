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
    avatarIcon.textContent = type === 'user' ? '😊' : '🤖';

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

