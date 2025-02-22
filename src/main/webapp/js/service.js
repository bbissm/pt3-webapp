import { store } from './store.js';

const BASE_URL = '/api';
const JSON_TYPE = 'application/json';

export const service = {
    getModules: async function() {
        let response = await sendRequest('GET', '/modules');
        return response.json();
    },
    getModule: async function(nr) {
        let response = await sendRequest('GET', `/modules/${nr}`);
        return response.json();
    },
    saveModule: async function(module) {
        console.log("Save Module", module)
        let response = await sendRequest('PUT', `/modules/${module.nr}`, module);
        return response.json();
    },
    addModule: async function(moduleData) {
        let response = await sendRequest('POST', '/modules', moduleData);
        return response.json();
    },
    removeModule: async function(nr) {
        let response = await sendRequest('DELETE', `/modules/${nr}`);
        return response.ok;
    },
    getModuleRuns: async function(moduleNr) {
        /*let response = await sendRequest('GET', `/module-runs?moduleNr=${moduleNr}`);
        return response.json();*/
        const moduleRuns = [
            { id: 1, moduleId: 'BTI1001', termId: 1, startDate: '2021-10-01', endDate: '2022-03-31', lecturer: 'John Doe', room: 'A123', time: 'Mo 10:00-12:00', description: 'This is a test description for module run 1.' },
            { id: 2, moduleId: 'BTI1011', termId: 1, startDate: '2021-10-01', endDate: '2022-03-31', lecturer: 'Jane Doe', room: 'A124', time: 'Mo 14:00-16:00', description: 'This is a test description for module run 2.' },
            { id: 3, moduleId: 'BTI1121', termId: 2, startDate: '2021-10-01', endDate: '2022-03-31', lecturer: 'John Doe', room: 'A125', time: 'Tu 10:00-12:00', description: 'This is a test description for module run 3.' },
            { id: 4, moduleId: 'BTI1301', termId: 3, startDate: '2021-10-01', endDate: '2022-03-31', lecturer: 'Jane Doe', room: 'A126', time: 'Tu 14:00-16:00', description: 'This is a test description for module run 4.' },
            { id: 5, moduleId: 'BTI1311', termId: 4, startDate: '2021-10-01', endDate: '2022-03-31', lecturer: 'John Doe', room: 'A127', time: 'We 10:00-12:00', description: 'This is a test description for module run 5.' }
        ];
        return moduleNr ? moduleRuns.filter(moduleRun => moduleRun.moduleId === moduleNr) : moduleRuns;
    },
    getModuleRunsByStudentAndTermId: async function(studentId, termId) {
        /*let response = await sendRequest('GET', `/module-runs?studentId=${studentId}&termId=${termId}`);
        return response.json();*/
        const moduleRuns = [
            { id: 1, moduleId: 'BTI1001', termId: 1, startDate: '2021-10-01', endDate: '2022-03-31', grade: 5.0 },
            { id: 2, moduleId: 'BTI1011', termId: 1, startDate: '2021-10-01', endDate: '2022-03-31', grade: 5.5 },
            { id: 3, moduleId: 'BTI1121', termId: 2, startDate: '2021-10-01', endDate: '2022-03-31', grade: 5.0 },
            { id: 4, moduleId: 'BTI1301', termId: 3, startDate: '2021-10-01', endDate: '2022-03-31', grade: 5.5 },
            { id: 5, moduleId: 'BTI1311', termId: 4, startDate: '2021-10-01', endDate: '2022-03-31', grade: 6.0 }
        ];

        return moduleRuns.filter(moduleRun => moduleRun.termId == termId);
    },
    getModuleRun: async function(moduleRunId) {
        /*let response = await sendRequest('GET', `/module-runs/${moduleRunId}`);
        return response.json();*/
        return { id: moduleRunId, moduleId: 'BTI1001', termId: 1, startDate: '2021-10-01', endDate: '2022-03-31', lecturer: 'John Doe', room: 'A123', time: 'Mo 10:00-12:00', description: 'This is a test description for module run 1.' };
    },
    saveModuleRun: async function(moduleRun) {
        let response = await sendRequest('PUT', `/module-runs/${moduleRun.id}`, moduleRun);
        return response.json();
    },
    addModuleRun: async function(moduleRunData) {
        let response = await sendRequest('POST', '/module-runs', moduleRunData);
        return response.json();
    },
    getStudents: async function(moduleRunId) {
        /*let response = await sendRequest('GET', `/students?moduleRunId=${moduleRunId}`);
        return response.json();*/
        return [
            { id: 1, name: 'Martin', grade: 5.0 },
            { id: 2, name: 'Tim', grade: 5.5 },
            { id: 3, name: 'Gil', grade: 5.0 },
            { id: 4, name: 'Pablo', grade: 5.5 }
        ];
    },
    saveStudentGrade: async function(student) {
        /*let response = await sendRequest('PUT', `/students/${student.id}`, student);
        return response.json();*/
        console.log(`Save grade ${student.grade} for student ${student.id}`);
        let response = { ok: true };
        return response.ok;
    },
    getTerms: async function(studentId) {
        /*let response = await sendRequest('GET', `/terms?studentId=${studentId}`);
        return response.json();*/
        return [
            { id: 1, name: 'Wintersemester 2024/25'},
            { id: 2, name: 'Frühlingssemester 2025'},
            { id: 3, name: 'Sommersemester 2025' },
            { id: 4, name: 'Herbstsemester 2025' }

        ];
    },
    getGrades: async function(studentId) {
        /*let response = await sendRequest('GET', `/grades?studentId=${studentId}`);
        return response.json();*/
        return [
            { moduleRunId: 1, grade: 5.0 },
            { moduleRunId: 2, grade: 5.5 },
            { moduleRunId: 3, grade: 5.0 },
            { moduleRunId: 4, grade: 5.5 }
        ];
    }
};

async function sendRequest(method, path, data = null) {
    let url = BASE_URL + path;
    let options = { method, headers: getHeaders(method) };
    if (data) options.body = JSON.stringify(data);
    console.log(`Send ${options.method} request to ${url}`);
    let response = await fetch(url, options);
    if (!response.ok) throw response;
    return response;
}

function getHeaders(method) {
    let headers = {};
    headers['Accept'] = JSON_TYPE;
    if (method === 'POST' || method === 'PUT') headers['Content-Type'] = JSON_TYPE;
    let user = store.getUser();
    user = { name: 'admin', password: 'admin'}
    if (user) headers['Authorization'] = 'Basic ' + btoa(user.name + ':' + user.password);
    return headers;
}
