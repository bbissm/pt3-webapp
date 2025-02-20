const main = document.querySelector('main');

getModules();

function getModules() {
	fetch('/api/modules', {
		method: 'GET',
		headers: { 'Accept': 'application/json' }
	})
		.then(response => response.ok ? response.json() : Promise.reject(response))
		.then(modules => renderModules(modules))
		.catch(error => main.innerHTML = '<div class="error">Loading of modules failed</div>');
}

function renderModules(modules) {
	main.innerHTML = '<h1>Module Overview</h1>';
	let table = document.createElement('table');
	let head = document.createElement('tr');
	head.innerHTML = '<th>Nr</th><th>Name</th>';
	table.append(head);
	modules.forEach(module => {
		let row = document.createElement('tr');
		row.innerHTML = `<td>${module.nr}</td><td>${module.name}</td><td><a href="#">Edit</a></td>`;
		row.querySelector('a').onclick = () => getModule(module.nr);
		table.append(row);
	});
	main.append(table);
}

function getModule(nr) {
	fetch('/api/modules/' + nr)
		.then(response => response.ok ? response.json() : Promise.reject(response))
		.then(module => renderModule(module))
		.catch(error => main.innerHTML = `<div class="error">Loading of module ${nr} failed</div>`);
}

function renderModule(module) {
	main.innerHTML = `
		<h1>Module Details</h1>
		<form></form>
		<button id="save">Save</button><button id="back">Back</button>
		<div id="message"></div>
	`;
	let form = main.querySelector('form');
	form.innerHTML = `
		<table>
			<tr><th>Nr</th><td><input name="nr" value="${module.nr}"</td></tr>
			<tr><th>Name</th><td><input name="name" value="${module.name}"</td></tr>
			<tr><th>Description</th>
				<td><textarea name="description" cols="50" rows="5">${module.description}</textarea></td></tr>
		</table>
	`;
	main.querySelector('#save').onclick = saveModule;
	main.querySelector('#back').onclick = getModules;
}

function saveModule() {
	let form = document.querySelector('form');
	let module = { nr: form.nr.value, name: form.name.value, description: form.description.value };
	let message = document.querySelector('#message');
	fetch('/api/modules/' + module.nr, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa('admin:admin') },
		body: JSON.stringify(module)
	})
		.then(response => response.ok ? response.json() : Promise.reject(response))
		.then(module => { message.innerText = `Module ${module.nr} saved`; message.className = 'success'; })
		.catch(error => { message.innerText = `Saving of module ${module.nr} failed`; message.className = 'error'; });
}
