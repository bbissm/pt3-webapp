import { store } from './store.js';

const BASE_URL = '/api';
const JSON_TYPE = 'application/json';

export const service = {
    getModules: async function() {
        /*let response = await sendRequest('GET', '/modules');
        return response.json();*/
        return [
            { nr: 'BTI1001', name: 'Programming with Java 1', description: 'In this module, you will learn the Java programming language, understand the object-oriented principles, and be able to implement, execute, and test programs in Java.' },
            { nr: 'BTI1011', name: 'Programming with Java 2', description: 'In this module, you will understand how generics, streams, and threads work, and know the Collections, I/O, and JavaFX libraries. You will be able to develop object-oriented applications using appropriate Java technologies.' },
            { nr: 'BTI1121', name: 'Software Engineering', description: 'In this module, you will learn the difference between agile and plan-oriented software development processes. You will get an overview of common project management tools and will be able to model different views of software systems with UML.' },
            { nr: 'BTI1301', name: 'Web Programming', description: 'In this module, you will learn how HTTP works and understand the different aspects of web applications. You will be able to design and implement a REST interface using Java servlets and develop a single-page application using JavaScript.' },
            { nr: 'BTI1311', name: 'Databases', description: 'In this module, you will learn about data modeling and the concepts of relational databases. You will be able to query and manipulate relational data with SQL and access a relational database programmatically with JDBC.' }
        ];
    },
    getModule: async function(nr) {
        /*let response = await sendRequest('GET', `/modules/${nr}`);
        return response.json();*/
        return { nr, name: `Module ${nr}`, description: `This is a test description for module ${nr}.` };
    },
    saveModule: async function(module) {
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
            { id: 1, moduleId: 'BTI1001', startDate: '2021-10-01', endDate: '2022-03-31', lecturer: 'John Doe', room: 'A123', time: 'Mo 10:00-12:00', description: 'This is a test description for module run 1.' },
            { id: 2, moduleId: 'BTI1011', startDate: '2021-10-01', endDate: '2022-03-31', lecturer: 'Jane Doe', room: 'A124', time: 'Mo 14:00-16:00', description: 'This is a test description for module run 2.' },
            { id: 3, moduleId: 'BTI1121', startDate: '2021-10-01', endDate: '2022-03-31', lecturer: 'John Doe', room: 'A125', time: 'Tu 10:00-12:00', description: 'This is a test description for module run 3.' },
            { id: 4, moduleId: 'BTI1301', startDate: '2021-10-01', endDate: '2022-03-31', lecturer: 'Jane Doe', room: 'A126', time: 'Tu 14:00-16:00', description: 'This is a test description for module run 4.' },
            { id: 5, moduleId: 'BTI1311', startDate: '2021-10-01', endDate: '2022-03-31', lecturer: 'John Doe', room: 'A127', time: 'We 10:00-12:00', description: 'This is a test description for module run 5.' }
        ];
        return moduleNr ? moduleRuns.filter(moduleRun => moduleRun.moduleId === moduleNr) : moduleRuns;
    },
    getModuleRun: async function(moduleRunId) {
        /*let response = await sendRequest('GET', `/module-runs/${moduleRunId}`);
        return response.json();*/
        return { id: moduleRunId, moduleId: 'BTI1001', startDate: '2021-10-01', endDate: '2022-03-31', lecturer: 'John Doe', room: 'A123', time: 'Mo 10:00-12:00', description: 'This is a test description for module run 1.' };
    },
    saveModuleRun: async function(moduleRun) {
        let response = await sendRequest('PUT', `/module-runs/${moduleRun.id}`, moduleRun);
        return response.json();
    },
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
    if (user) headers['Authorization'] = 'Basic ' + btoa(user.name + ':' + user.password);
    return headers;
}
