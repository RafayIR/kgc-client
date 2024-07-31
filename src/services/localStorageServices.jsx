const LocalStorageService = {
    set,
    get,
    setObject,
    getObject,
    clear,
    remove
}

function set(key, value) {
    localStorage[key] = value;
    return localStorage[key];
}
function get(key, defaultValue) {
    return localStorage[key] || defaultValue;
}
function setObject(key, value) {
    localStorage[key] = JSON.stringify(value);
    return localStorage[key];
}

function getObject(key, value) {
    return JSON.parse(localStorage[key] || '{}');
}

function clear() {
    return localStorage.clear();
}

function remove(key) {
    return localStorage.removeItem(key);
}

export default LocalStorageService;