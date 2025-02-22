
import { service } from '../service.js';
import { router } from '../router.js';
export class ModuleDetail extends HTMLElement {
    async connectedCallback() {
        let id = this.getAttribute('id');
        this.innerHTML = `
            <h1 class="title">Module Details</h1>
            <form></form>
            <button id="save">Save</button><button id="back">Back</button>
            <div id="message"></div>
            <module-run-list id="module-run-list" module-id="${id}"></module-run-list>
        `;
        let module = await service.getModule(id);
        this.#renderModule(module);

    }

    #renderModule(module) {
        let form = this.querySelector('form');
        form.innerHTML = `
            <table>
                <tr><th>Nr</th><td><input name="nr" value="${module.nr}"</td></tr>
                <tr><th>Name</th><td><input name="name" value="${module.name}"</td></tr>
                <tr><th>Description</th>
                    <td><textarea name="description" cols="50" rows="5">${module.description}</textarea></td></tr>
            </table>
        `;
        this.querySelector('#save').onclick = () => this.#saveModule;
        this.querySelector('#back').onclick = () =>  router.navigate('module-list');
    }

    async #saveModule() {
        let form = document.querySelector('form');
        let module = {nr: form.nr.value, name: form.name.value, description: form.description.value};
        await service.saveModule(module);
    }
}
