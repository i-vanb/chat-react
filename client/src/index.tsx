import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { Provider } from 'react-redux'
import {RouterProvider} from "react-router";
import {store} from "./redux/reducers";
import Root from "./router/Root";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <RouterProvider router={Root} />
    </Provider>
);
