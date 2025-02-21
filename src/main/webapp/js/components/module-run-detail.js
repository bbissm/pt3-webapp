import { service } from '../service.js';
import { router } from '../router.js';

export class ModuleRunDetail extends HTMLElement {

    static #template = `
		<h1>Module Run Details</h1>
		<form></form>
		<button id="save">Save</button><button id="back">Back</button>
		<div id="message"></div>
	`;

    async connectedCallback() {
        this.innerHTML = ModuleRunDetail.#template;
        let id = this.getAttribute('id');
        let moduleRun = await service.getModuleRun(id);
        this.#renderModuleRun(moduleRun);

    }

    #renderModuleRun(moduleRun) {
        let form = this.querySelector('form');
        // render moduleRun
        form.innerHTML = `
            <table>
                <tr><th>Module ID</th><td><input name="moduleId" value="${moduleRun.moduleId}"</td></tr>
                <tr><th>Start Date</th><td><input name="startDate" value="${moduleRun.startDate}"</td></tr>
                <tr><th>End Date</th><td><input name="endDate" value="${moduleRun.endDate}"</td></tr>
                <tr><th>Lecturer</th><td><input name="lecturer" value="${moduleRun.lecturer}"</td></tr>
                <tr><th>Room</th><td><input name="room" value="${moduleRun.room}"</td></tr>
                <tr><th>Time</th><td><input name="time" value="${moduleRun.time}"</td></tr>
                <tr><th>Description</th><td><textarea name="description" cols="50" rows="5">${moduleRun.description}</textarea></td></tr>
            </table>
        `;
        this.querySelector('#save').onclick = () => this.#saveModuleRun;
        this.querySelector('#back').onclick = () =>  router.navigate('module-run-list');
    }

    async #saveModuleRun() {
        let form = document.querySelector('form');
        let moduleRun = {moduleId: form.moduleId.value, startDate: form.startDate.value, endDate: form.endDate.value, lecturer: form.lecturer.value, room: form.room.value, time: form.time.value, description: form.description.value};
        let message = document.querySelector('#message');
        await service.saveModuleRun(module);
    }
}
