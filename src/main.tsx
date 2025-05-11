import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./App";
import "./index.css";
import { ModalContextProvider } from "./hooks/useModal/useModalProvider";
import { Provider } from 'react-redux';
import { store } from './store/store';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalContextProvider>
        <RouterProvider router={router} />
      </ModalContextProvider>
    </Provider>
  </React.StrictMode>
);