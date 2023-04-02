import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GloablStyles from './components/GloablStyles';
import ModalLoadingContext from './contexts/ModalLoadingContext';
import store from './store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>

    <Provider store={store}>
        <GloablStyles>
            <ModalLoadingContext>
                <App />
            </ModalLoadingContext>
        </GloablStyles>
    </Provider>,
    // </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
