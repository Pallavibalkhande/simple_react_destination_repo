package src/window/windowRegistry.js
import Win32Window from './Win32Window';

const windowRegistry = new WeakMap();

function registerWindow(element, instance) {
    if (!element || !(element instanceof HTMLElement)) return null;
    if (!instance || !(instance instanceof Win32Window)) return null;
    if (windowRegistry.has(element)) return null;
    windowRegistry.set(element, instance);
    return instance;
}

function getWindow(element) {
    if (!element) return null;
    return windowRegistry.get(element) || null;
}

export { registerWindow, getWindow };