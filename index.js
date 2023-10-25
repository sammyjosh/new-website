import React from 'react';
import 'tailwindcss/tailwind.css';

import { createRoot } from 'react-dom/client'; // Import createRoot from 'react-dom/client'

import App from './App';

const root = createRoot(document.getElementById('root')); // Create a root

root.render(<App />); // Use root to render your app
