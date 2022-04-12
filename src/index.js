import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import coins from "./features/coinSlice";
import { Provider } from "react-redux";

const store = configureStore({
        reducer: coins
    })

ReactDOM.render(
        <Provider store={store}>
                <React.StrictMode>
                        <App />
                </React.StrictMode>
        </Provider>,    
     document.getElementById('root')
     );
