// main.tsx
import './global.css';
import '@fontsource-variable/inter-tight'; 
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import App from './App';
import client from '../apollo/client';
import { routesSection } from './routes/sections';
import { ErrorBoundary } from './routes/components';

const router = createBrowserRouter([
  {
    Component: () => (
      <App>
        <Outlet />
      </App>
    ),
    errorElement: <ErrorBoundary />,
    children: routesSection,
  },
]);

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>
);
