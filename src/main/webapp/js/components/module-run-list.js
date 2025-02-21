/*
Modul-ID: Verknüpfung zum Hauptmodul.
Start- und Enddatum: Wann der Kurs beginnt und endet.
Lehrkraft/Dozent: Wer den Kurs leitet.
Teilnehmerliste: Welche Studenten eingeschrieben sind.
Raum/Ort: Wo der Kurs stattfindet.
Zeitplan/Sitzungszeiten: Spezifische Zeiten für Kursveranstaltungen.
Beschreibung: Zusätzliche Informationen zum spezifischen Durchlauf.
 */
import {router} from '../router.js';
import {service} from '../service.js';

export class ModuleRunList extends HTMLElement {

    static #template = `
        <h1>Module Run Overview</h1>
        <a href="#module-list">Back</a>
        <table>
            <tr><th>Module ID</th><th>Start Date</th><th>End Date</th><th>Lecturer</th><th>Room</th><th>Time</th><th>Description</th><th></th></tr>
        </table>
        <button id="add">Add</button>
    `;

    set moduleId(value) {
        this.setAttribute('module-id', value);
    }

    get moduleId() {
        return this.getAttribute('module-id')
    }

    async connectedCallback() {
        this.innerHTML = ModuleRunList.#template;
        const moduleId = this.getAttribute('module-id');
        let moduleRuns = await service.getModuleRuns(moduleId);
        this.#renderModuleRuns(moduleRuns);
        this.querySelector('#add').onclick = () => router.navigate('module-run-add');
    }

    #renderModuleRuns(moduleRuns) {
        let table = this.querySelector('table');
        moduleRuns.forEach(moduleRun => {
            let row = document.createElement('tr');
            row.innerHTML = `<td><a href="#module-detail?id=${moduleRun.moduleId}">${moduleRun.moduleId}</a></td><td>${moduleRun.startDate}</td><td>${moduleRun.endDate}</td><td>${moduleRun.lecturer}</td><td>${moduleRun.room}</td><td>${moduleRun.time}</td><td>${moduleRun.description}</td><td><a href="#module-run-detail?id=${moduleRun.moduleId}">Edit</a></td>`;
            table.append(row);
        });
    }
}
