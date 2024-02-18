import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Profile } from "./models/profile";
import {serverPath} from "./rest.ts";

@customElement("user-profile")
export class UserProfileElement extends LitElement {
    @property()
    path: string = "";

    @state()
    profile?: Profile;

    _fetchData(path: string) {
        fetch(serverPath(path))
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
                return null;
            })
            .then((json: unknown) => {
                if (json) this.profile = json as Profile;
            });
    }

    connectedCallback() {
        if (this.path) {
            this._fetchData(this.path);
        }
        super.connectedCallback();
    }

    attributeChangedCallback(
        name: string,
        oldValue: string,
        newValue: string
    ) {
        if (name === "path" && oldValue !== newValue && oldValue) {
            this._fetchData(newValue);
        }
        super.attributeChangedCallback(name, oldValue, newValue);
    }

    render() {
        return html`
            <div>
                <h1>User Profile</h1>
                <p>userID: ${this.profile?.userid}</p>
                <p>Name: ${this.profile?.name}</p>
            </div>
        `;
    }

    static styles = css`
    :host {
      display: block;
      padding: 10px;
      color: var(--color-background-page);
      background-color: yellow;
    }
        
    `;
}

@customElement("user-profile-edit")
export class UserProfileEditElement extends UserProfileElement {
    render() {
        return html`<form @submit=${this._handleSubmit}>
            <label for="userID">User ID:</label>
            <input id="userID" name="userid" type="text" value="${this.profile?.userid || ''}" />
            <label for="name">Name:</label>
            <input id="name" name="name" type="text" value="${this.profile?.name || ''}" />
        <button type="submit">Submit</button>
    </form> `;
    }

    static styles = css`
      
    `;

    _handleSubmit(ev: Event) {
        ev.preventDefault(); // prevent browser from submitting form data itself

        const target = ev.target as HTMLFormElement;
        const formdata = new FormData(target);
        const entries = Array.from(formdata.entries())
            .map(([k, v]) => (v === "" ? [k] : [k, v]))
            .map(([k, v]) =>
                k === "airports"
                    ? [k, (v as string).split(",").map((s) => s.trim())]
                    : [k, v]
            );
        const json = Object.fromEntries(entries);

        this._putData(json);
    }

    _putData(json: Profile) {
        fetch(serverPath(this.path), {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(json)
        })
            .then((response) => {
                if (response.status === 200) return response.json();
                else return null;
            })
            .then((json: unknown) => {
                if (json) this.profile = json as Profile;
            })
            .catch((err) =>
                console.log("Failed to PUT form data", err)
            );
    }
}
