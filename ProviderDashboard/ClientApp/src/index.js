import './styles/tailwind.css';
import './styles/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import ScrollToTop from './components/common/ScrollToTop';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
    <>
      <ScrollToTop />
      <App />
    </>
  </BrowserRouter>,
  rootElement,
);
