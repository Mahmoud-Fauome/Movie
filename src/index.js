import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";
import { BrowserRouter } from 'react-router-dom';
import "./index.css"
import { Provider } from 'react-redux';
import store from './Redux-system/Store';
import { ThemeProvider } from "@material-tailwind/react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
  <ThemeProvider>
   <Provider store={store}>
     <App/>
   </Provider>
  </ThemeProvider>
</BrowserRouter>
);

 