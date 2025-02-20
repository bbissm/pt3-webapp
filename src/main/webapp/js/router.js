import { UserLogin } from './components/user-login.js';
import { UserLogout } from "./components/user-logout.js";
import { ModuleList } from "./components/module-list.js";
import { ModuleDetail } from "./components/module-detail.js";
import { store } from "./store.js";

customElements.define('user-login', UserLogin);
customElements.define('user-logout', UserLogout);
customElements.define('module-list', ModuleList);
customElements.define('module-detail', ModuleDetail);

export const router = {
    navigate: function(uri) {
        if (uri === location.hash.replace('#', ''))
            navigate(uri);
        else location.hash = uri;
    }
};

window.onhashchange = () => navigate(location.hash.replace('#', ''));

function navigate(uri) {
    console.log(`Navigate to ${uri}`);
    let component = createComponent(uri);
    showComponent(component);
}

function createComponent(uri) {
    let [name, query] = uri.split('?');
    if (!customElements.get(name)) throw new Error(`Component ${name} not found`);
    let component = document.createElement(name);
    new URLSearchParams(query).forEach((value, name) => component.setAttribute(name, value));
    return component;
}

function showComponent(component) {
    console.log("Trying to show component", component)
    document.querySelector('main').replaceChildren(component);
}
