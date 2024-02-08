import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("drop-down")
export class DropDownElement extends LitElement {
    @property({ reflect: true, type: Boolean })
    open: boolean = false;

    render() {
        return html`
      <input
        type="checkbox"
        id="is-shown"
        @change=${this._handleChange}
        .checked=${this.open} />
      <label for="is-shown">
        <slot name="label" style="color: var(--color-header-text)">Menu</slot>
      </label>
      <div class="menu">
        <slot></slot>
      </div>
    `;
    }

    static styles = css`
      :host {
        display: inline-block;
        position: relative;
      }

      #is-shown {
        display: none;
      }

      label {
        cursor: pointer;
      }

      .menu {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        border: 1px solid;
        background: white;
      }

      #is-shown:checked ~ .menu {
        display: block;
      }

      /* CSS for slotted elements and default slot content */

      ::slotted(ul),
      .menu > slot > ul {
        margin: 0;
        padding: 0.25em;
        list-style: none;
        white-space: nowrap;
      }
    `;

    _handleChange(ev: InputEvent) {
        const target = ev.target as HTMLInputElement;
        this._toggle(target.checked);
    }

    _toggle(open: boolean) {
        this.open = open;
        if (open) {
            this.dispatchEvent(new CustomEvent('dropdown-expanded', { detail: { open }, bubbles: true, composed: true }));
        }
        this._toggleClickAway(open);
    }

    _toggleClickAway(open: boolean) {
        const clickawayHandler = (ev: Event) => {
            if (!ev.composedPath().includes(this)) {
                this._toggle(false);
            } else {
                ev.stopPropagation();
            }
        };

        if (open) {
            document.addEventListener("click", clickawayHandler);
        } else {
            document.removeEventListener("click", clickawayHandler);
        }
    }
}
