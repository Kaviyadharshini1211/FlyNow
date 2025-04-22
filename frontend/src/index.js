import React from 'react';
import ReactDOM from 'react-dom/client'; // For React 18 and later
import './index.css';
import App from './App';

const rootElement = document.getElementById('root');

// Make sure 'root' is a DOM element
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found!");
}
