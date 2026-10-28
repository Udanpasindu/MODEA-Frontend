import React from 'react';import ReactDOM from 'react-dom/client';import {RouterProvider} from 'react-router-dom';import {QueryClient,QueryClientProvider} from '@tanstack/react-query';import {CartProvider} from './features/cart/CartContext';import {router} from './app/router';import './styles.css';
import './admin-enhancements.css';
import './seasonal.css';
import './responsive.css';
import './media-refresh.css';
import './media-layout-fix.css';
const client=new QueryClient({defaultOptions:{queries:{staleTime:30_000,retry:1}}});ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><QueryClientProvider client={client}><CartProvider><RouterProvider router={router}/></CartProvider></QueryClientProvider></React.StrictMode>);
