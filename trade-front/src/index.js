import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducer';
import { BrowserRouter as Router } from 'react-router-dom';

let store = createStore(reducer);

ReactDOM.render(<Provider store={store}><Router><App /></Router></Provider>, document.getElementById('root'));