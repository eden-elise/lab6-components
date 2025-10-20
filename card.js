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
    getStyles() {
        return `
            <style>
                :host {
                    display: block;
                    --card-bg: #fff;
                    --card-radius: 1.25rem;
                    --card-padding: 1rem;
                    --card-shadow: 0 4px 20px rgba(0,0,0,0.08);
                    --card-shadow-hover: 0 8px 30px rgba(0,0,0,0.12);
                    --transition-speed: 0.3s;
                    --hover-lift: -8px;

                    --badge-padding: 0.5rem 1rem;
                    --badge-radius: 2rem;
                    --badge-font-size: 0.8rem;
                    --badge-font-weight: 700;
                    --badge-letter-spacing: 0.005rem;
                    --badge-margin: 1rem;
                    --badge-bg: #FFD5D5;
                    --badge-color: #333;

                    --title-font-size: 1.6rem;
                    --title-color: #333;
                    --title-margin: .75rem;
                    --title-font-weight: 600;
                    --title-line-height: 1.3;

                    --description-color: #666;
                    --description-line-height: 1.5;
                    --description-margin: 0rem;
                    --description-font-size: 1rem;

                    --feature-color: #333;
                    --feature-padding: 0.25rem;
                    --feature-font-size: 0.95rem;

                    --link-color: #FFA4A4;
                    --link-font-weight: 600;
                    --link-font-size: 1.05rem;
                    --link-gap: 1rem;
                    --link-gap-hover: 1rem;

                    --features-margin: 1.5rem;
                }

                .card {
                    background: var(--card-bg);
                    border-radius: var(--card-radius);
                    padding: var(--card-padding);
                    box-shadow: var(--card-shadow);
                    transition: transform var(--transition-speed) ease, box-shadow var(--transition-speed) ease;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                }

                .card:hover {
                    transform: translateY(var(--hover-lift));
                    box-shadow: var(--card-shadow-hover);
                }

                .card-badge {
                    display: inline-block;
                    padding: var(--badge-padding);
                    border-radius: var(--badge-radius);
                    font-size: var(--badge-font-size);
                    font-weight: var(--badge-font-weight);
                    text-transform: uppercase;
                    letter-spacing: var(--badge-letter-spacing);
                    margin-bottom: var(--badge-margin);
                    width: fit-content;
                    background: var(--badge-bg);
                    color: var(--badge-color);
                }

                .card-title {
                    font-size: var(--title-font-size);
                    color: var(--title-color);
                    margin-bottom: var(--title-margin);
                    font-weight: var(--title-font-weight);
                    line-height: var(--title-line-height);
                }

                .card-description {
                    color: var(--description-color);
                    line-height: var(--description-line-height);
                    margin-bottom: var(--description-margin);
                    flex-grow: 1;
                    font-size: var(--description-font-size);
                }

                .features {
                    list-style: none;
                    margin: 0 0 var(--features-margin) 0;
                    padding: 0;
                }

                .features ::slotted(li) {
                    color: var(--feature-color);
                    padding: var(--feature-padding);
                    font-size: var(--feature-font-size);
                }

                .card-link {
                    color: var(--link-color);
                    font-weight: var(--link-font-weight);
                    text-decoration: none;
                    font-size: var(--link-font-size);
                    transition: gap var(--transition-speed) ease;
                    display: inline-flex;
                    align-items: center;
                    gap: var(--link-gap);
                }

                .card-link:hover {
                    gap: var(--link-gap-hover);
                }
            </style>
        `;
    }
}
customElements.define('card-template', cardTemplate);