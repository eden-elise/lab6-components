/**
 * card web component
 * reusable card component for displaying different chat approaches
 */
class cardTemplate extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        const badge = this.getAttribute('badge') || 'Approach';
        const title = this.getAttribute('title') || 'Title';
        const description = this.getAttribute('description') || 'Description';
        const link = this.getAttribute('link') || '#';
        const theme = this.getAttribute('theme') || 'default';
        // structure
        this.shadowRoot.innerHTML = `
            ${this.getStyles()}
            <div class="card ${theme}">
                <div class="card-badge">${badge}</div>
                <h2 class="card-title">${title}</h2>
                <p class="card-description">${description}</p>
                <ul class="features">
                    <slot name="features"></slot>
                </ul>
                <a href="${link}" target="_blank" class="card-link">View Demo →</a>
            </div>
        `;
    }
}
customElements.define('card-template', cardTemplate);