import { router } from '../router.js';
import { service } from '../service.js';
import { store } from '../store.js';

export class UserLogin extends HTMLElement {

    user = {};
    static #template = `
        <h1 class="title">User Login</h1> 
        <form>
            <label for="name">Name</label><input id="name" name="name" required>
            <label for="password">Password</label><input id="password" name="password" type="password" required>
            <button id="login">Login</button>
            <button id="register">Register</button>
        </form>
    `;

    async connectedCallback() {
        this.innerHTML = UserLogin.#template;
        this.querySelector('#login').onclick = () => this.#loginUser();
        this.querySelector('#register').onclick = () => this.#registerUser();
    }

    async #loginUser() {
        let form = this.querySelector('form');
        if (!form.reportValidity()) return;
        document.querySelector('footer').innerHTML = '';
        try {
            store.setUser(this.user);
            await service.getModules();
            router.navigate('module-list');
        } catch (error) {
            store.clear();
            if (error.status === 401)
                document.querySelector('footer').innerHTML = 'Invalid credentials';
            else throw error;
        }
    }

    async #registerUser() {
        let form = this.querySelector('form');
        if (!form.reportValidity()) return;
        document.querySelector('footer').innerHTML = '';
        try {
            await service.postUser(this.user);
            store.setUser(this.user);
            router.navigate('module-list');
        } catch (error) {
            if (error.status === 409)
                document.querySelector('footer').innerHTML = 'User already exists';
            else throw error;
        }
    }
}
