import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement('page-card')
export class PageCard extends LitElement {
    @property({type: Boolean, reflect: true}) showDescription: boolean = true;

    static styles = css`
    :host {
      width: 50%;
      display: block;
      border-radius: 10px;
      padding: 15px;
      background-color: var(--color-accent);
      margin-bottom: 10px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    td {
      color: var(--color-header-text);
      border: 1px solid var(--color-header-text);
      text-align: center;
      padding: 8px;
    }
    td:first-child {
      width: 20%;
    }
    td:last-child {
      width: 80%;
    }
    .description {
      display: var(--description-display, block);
    }
  `;

    updated(changedProperties) {
        if (changedProperties.has('showDescription')) {
            this.style.setProperty('--description-display', this.showDescription ? 'block' : 'none');
        }
    }

    render() {
        return html`
            <table>
                <tr>
                    <td><slot name="title"></slot></td>
                    <td class="description"><slot name="description"></slot></td>
                </tr>
            </table>
        `;
    }
}

