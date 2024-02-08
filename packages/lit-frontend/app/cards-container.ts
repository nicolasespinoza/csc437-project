import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('cards-container')
export class CardsContainer extends LitElement {
    static styles = css`
    :host {
      display: block;
    }
  `;

    // Handler for the toggle-switch change event
    toggleDescriptions(e) {
        // The new state is determined by the toggle-switch's 'on' property
        const newState = e.target.on;
        this.togglePageCardDescriptions(newState);
    }

    togglePageCardDescriptions(newState) {
        // Query all page-card elements within this container
        const cards = this.querySelectorAll('page-card');
        // Toggle the showDescription property for each card
        cards.forEach(card => {
            card.showDescription = !newState;
        });
    }

    render() {
        return html`
      <toggle-switch @change=${this.toggleDescriptions}>Show only links</toggle-switch>
      <slot></slot>
    `;
    }
}
