import { service } from '../service.js';
import { router } from '../router.js';
export class ModuleList extends HTMLElement {

    static #template = `
		<h1>Module Overview</h1>
		<a href="/">Back</a>
		<table>
            <tr><th>Number</th><th>Name</th><th></th></tr>
        </table>
        <button id="add">Add</button>
        
	`;

    async connectedCallback() {
        this.innerHTML = ModuleList.#template;
        let modules = await service.getModules();
        this.#renderModules(modules);
        this.querySelector('#add').onclick = () => router.navigate('module-add');
    }

    #renderModules(modules) {
        let table = this.querySelector('table');
        modules.forEach(module => {
            let row = document.createElement('tr');
            row.innerHTML = `<td>${module.nr}</td><td>${module.name}</td><td><a href="#module-detail?id=${module.nr}">Edit</a></td>`;
            table.append(row);
        });
    }

    #renderReservation(reservation) {
        let row = document.createElement('tr');
        console.log("Reservation", reservation)
        row.innerHTML = `<td>${reservation.date}</td><td>${reservation.room}</td><td><button class="primary deleteReservation" value="${reservation.nr}">Delete</button></td>`;
        return row;
    }
}
