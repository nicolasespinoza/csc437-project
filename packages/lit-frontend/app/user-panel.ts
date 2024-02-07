import { LitElement, html, css } from 'lit';
import { customElement } from "lit/decorators.js";

@customElement('user-panel')
class UserPanel extends LitElement {

    // Defining styles for component
    static styles = css`
    :host {
      //display: block;
    }
      
      drop-down {
        /* Dropdown sttyling */
      }
      
    drop-down p {
      margin-block-start: 0;
      margin-block-end: 0;
      /* Dropdown styling */
    }
  `;

    render() {
        return html`
            <drop-down>
                <p>Account</p>
            </drop-down>
        `;
    }
}