// An example front-end to the server. 
// 
// Exercise to make this susceptible to XSS attacks.

// Note that we import 'lit-all' rather than the normal 'lit-core' 
// because we want to be able to use unsafeHTML.
import {LitElement, html} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
// add unsafeHTML to the import list

class LikesDisplay extends LitElement {

    static properties = {
        _likes: {state: true},
    };

    constructor() {
        super();
        this._likes = [];
    }

    connectedCallback() {
        super.connectedCallback();
        this._fetchLikes();
    }

    _fetchLikes() {
        fetch('/likes')
            .then((response) => response.json())
            .then((data) => {
                this._likes = data;
            });
    }

    _submit(event) {
        event.preventDefault();
        console.log({thing: event.target.thing.value});
        fetch('/likes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({thing: event.target.thing.value}),
        })
        .then(response => response.json())
        .then((data) => {
            this._fetchLikes();
        });
        event.target.thing.value = '';  
    }


    // XSS vulnerability:
    // replace ${like} below with ${unsafeHTML(like)}
    // this allows the user to inject HTML into the page
    render() {
        return html`
            <div>
                <h2>Likes</h2>
                <form @submit=${this._submit}>
                    <textarea type="text" name="thing" placeholder="thing"></textarea>
                    <button type="submit">Like</button>
                </form>

                <ul>
                    ${this._likes.map((like) => html`<li>${like}</li>`)}
                </ul>
            </div>
        `;
    }
}

customElements.define('likes-display', LikesDisplay);   


class CounterDisplay extends LitElement {

    static properties = {
        _count: {state: true},
    };

    constructor() {
        super();
        this._count = 0;
    }

    connectedCallback() {
        super.connectedCallback();
        this._fetchCount();
    }

    _fetchCount() {
        fetch('/count')
            .then((response) => response.json())
            .then((data) => {
                this._count = data.count;
            });
    }

    render() {
        return html`
            <div>
                <h2>Count</h2>
                <p>You have visited the site ${this._count} times.</p>
            </div>
        `;
    }
};

customElements.define('counter-display', CounterDisplay);