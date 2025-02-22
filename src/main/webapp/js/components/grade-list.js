import { service } from '../service.js';
import { router } from '../router.js';
export class GradeList extends HTMLElement {
    static #template = `
		<h1 class="title">Terms Overview</h1>
		<a href="/">Back</a>
		<div class="is-flex">
            <div class="sidebar">
                <table id="terms">
                    <tr><th>Semester</th></tr>
                </table>
            </div>
            <div class="main">
                <table id="modules">
                    <tr><th>Module Run</th><th>Module ID</th><th>Grade</th></tr>
                </table>
            </div>
        </div>
		
	`;


    async connectedCallback() {
        this.innerHTML = GradeList.#template;
        let studentId = this.getAttribute('student-id'); // should get from logged in user instead of url
        let terms = await service.getTerms(studentId);
        this.#renderTerms(terms)
    }

    async #renderModuleRuns(event) {
        console.log("Clicked on term", event.target)
        //let studentId = this.getAttribute('student-id'); // should get from logged in user instead of url
        let studentId = 1;
        let termId = event.target.getAttribute('data-term-id');
        console.log("StudentId", studentId, "TermId", termId)
        let moduleRuns = await service.getModuleRunsByStudentAndTermId(studentId, termId);
        if (moduleRuns.length == 0) {
            alert("No module runs found for student " + studentId);
            return;
        }
        let table = this.querySelector('#modules');
        table.innerHTML = `<tr><th>Module Run</th><th>Module ID</th><th>Grade</th></tr>`;
        console.log("Table", table)
        moduleRuns.forEach(moduleRun => {
            let row = document.createElement('tr');
            row.innerHTML = `<td>${moduleRun.id}</td><td>${moduleRun.moduleId}</td><td>${moduleRun.grade}</td>`;
            table.append(row);
        });
    }

    #renderTerms(terms) {
        let table = this.querySelector('#terms');
        terms.forEach(term => {
            let row = document.createElement('tr');
            row.innerHTML = `<td class="term" data-term-id="${term.id}">${term.name}</td>`;
            row.querySelector('.term').addEventListener('click', this.#renderModuleRuns.bind(this));
            table.append(row);
        });
    }
}
