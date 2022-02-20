// Imports
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Stores MobX
import HenriStore from './stores/henriStore';
import { Provider } from 'mobx-react';
const henriStore = new HenriStore();
const stores = { henriStore };

// ReactDOM
ReactDOM.render(<Provider { ...stores }><App/></Provider>, document.getElementById('root'));