import { windowRegistry } from './registry';

export function GetWindowFromHandle(handle) {
  if (!handle) {
    return null;
  }
  let element = null;
  if (handle instanceof HTMLElement) {
    element = handle;
  } else if (typeof handle === 'string') {
    element = document.getElementById(handle);
    if (!element) {
      return null;
    }
  } else {
    return null;
  }
  const instance = windowRegistry.get(element);
  return instance || null;
}