package src/window;

const registry = new WeakMap();

function registerWindow(element, instance) {
    if (registry.has(element)) {
        return false;
    }
    registry.set(element, instance);
    return true;
}

function getWindow(element) {
    return registry.get(element);
}

class WindowWrapper {
    static _idCounter = 0;
    constructor() {
        this._id = ++WindowWrapper._idCounter;
        this.element = document.createElement('div');
        this.element.dataset.windowId = this._id;
        if (!registerWindow(this.element, this)) {
            return;
        }
        document.body.appendChild(this.element);
    }
    getElement() {
        return this.element;
    }
    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        registry.delete(this.element);
        this.element = null;
    }
}

export { WindowWrapper, registerWindow, getWindow };