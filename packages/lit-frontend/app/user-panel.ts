import { LitElement, html, css } from 'lit';
import { customElement } from "lit/decorators.js";
import {ToggleSwitchElement} from "./toggle-switch";

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
                <ul>
                    <li>
                        <toggle-switch id="toggle-theme-switch"
                                       @change=${this._toggleDarkMode}>Light Theme</toggle-switch>
                    </li>
                    <li><a href="https://google.com">My Profile</a></li>
                    <li><a href="https://google.com">Sign Out</a></li>
                </ul>
            </drop-down>
        `;
    }

    _toggleDarkMode(ev: InputEvent) {
        console.log("WOWWWW");
        const target = ev.target as ToggleSwitchElement;
        const body = document.body;

        if (target?.on) body.classList.add("light-mode");
        else body.classList.remove("light-mode");
    }

}