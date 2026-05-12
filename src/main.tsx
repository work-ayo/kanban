import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import './styles/globals.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/kanban.css';
import './styles/gantt.css';
import './styles/reports.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
