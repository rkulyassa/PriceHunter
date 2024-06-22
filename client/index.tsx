import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const container: HTMLElement | null = document.getElementById('app');
const root: ReactDOM.Root = ReactDOM.createRoot(container!);
// root.render(<App />);
root.render(<React.StrictMode><App /></React.StrictMode>);