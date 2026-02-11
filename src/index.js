package src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AppInitializer } from './AppInitializer';

AppInitializer.initializePlugins();

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element with id "root" not found.');
}

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

package src/windowEntry.js
import { WindowWrapper } from './window/WindowWrapper';
import { GetWindowFromHandle } from './window/GetWindowFromHandle';

export { WindowWrapper, GetWindowFromHandle };