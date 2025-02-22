import { service } from '../service.js';
import { router } from '../router.js';
export class StudentList extends HTMLElement {

    static #template = `
		<h1 class="title">Student Overview</h1>
		<table>
            <tr><th>Number</th><th>Name</th><th>Note</th></tr>
        </table>
        <div class="message error"></div>
        <button id="add">Add</button>
	`;

    set moduleRunId(value) {
        this.setAttribute('module-run-id', value);
    }

    get moduleRunId() {
        return this.getAttribute('module-run-id')
    }


    async connectedCallback() {
        console.log("connected student-list")
        this.innerHTML = StudentList.#template;
        const moduleRunId = this.getAttribute('module-run-id');
        console.log("moduleRunId: " + moduleRunId);
        let students = await service.getStudents(moduleRunId);
        this.#renderStudents(students);
    }

    // source chatgpt
    #changeGrade(event) {
        let grade = event.target.value;
        const pattern = /^[1-6](\.5)?$/;
        if (pattern.test(grade)) {
            let studentId = event.target.getAttribute('data-student-id');
            service.saveStudentGrade({ id: studentId, grade: grade });
        } else {
            this.querySelector('.message').innerHTML = 'Invalid grade. Please enter a grade between 1.0 and 6.0 in half steps.';
            setTimeout(() => {
                this.querySelector('.message').innerHTML = '';
            }, 3000);
            event.target.value = '';
        }
    }

    #renderStudents(students) {
        let table = this.querySelector('table');
        students.forEach(student => {
            let row = document.createElement('tr');
            row.innerHTML = `<td>${student.id}</td><td>${student.name}</td><td><input data-student-id="${student.id}" class="grade" value="${student.grade}"/></td>`;
            row.querySelector('.grade').addEventListener('change', this.#changeGrade.bind(this));
            table.append(row);
        });
    }


}
