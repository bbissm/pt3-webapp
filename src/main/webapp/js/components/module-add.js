import {router} from '../router.js';
import {service} from '../service.js';
export class ModuleAdd extends HTMLElement {
    static #template = `
        <h1 class="title">Module Add</h1>
        <form>
            <table>
                <tr><th>Nr</th><td><input name="nr" required></td></tr>
                <tr><th>Name</th><td><input name="name" required></td></tr>
                <tr><th>Description</th><td><textarea name="description" cols="50" rows="5"></textarea></td></tr>
            </table>
        </form>
        <button id="save">Save</button><button id="back">Back</button>
        <div id="message"></div>
    `;

    async connectedCallback() {
        this.innerHTML = ModuleAdd.#template;
        this.querySelector('#save').onclick = () => this.#addModule();
        this.querySelector('#back').onclick = () => router.navigate('module-list');
    }

    async #addModule() {
        let form = document.querySelector('form');
        let module = {nr: form.nr.value, name: form.name.value, description: form.description.value};
        let message = document.querySelector('#message');
        await service.addModule(module);
    }
}