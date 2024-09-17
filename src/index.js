import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import'bootstrap/dist/css/bootstrap.min.css';
import'bootstrap/dist/js/bootstrap.bundle.min.js';
import'@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import UserContextProvider from './Context/UserContext';



const root = ReactDOM.createRoot(document.getElementById('root'));

let queryClient = new QueryClient();

root.render(
    
    <QueryClientProvider client={queryClient}>
        <UserContextProvider>
        <App />
        </UserContextProvider>
    </QueryClientProvider>
    
);