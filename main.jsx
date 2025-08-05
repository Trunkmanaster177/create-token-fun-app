import React from 'react';
import { createRoot } from 'react-dom/client'; // ✅ React 18 compatible
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
