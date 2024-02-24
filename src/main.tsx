import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { AxiosInterceptor } from './interceptor/axios.interceptor';
import 'react-loading-skeleton/dist/skeleton.css'
import { SkeletonTheme} from 'react-loading-skeleton'
import { Toaster } from "react-hot-toast";
AxiosInterceptor();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <SkeletonTheme baseColor="#bababa" highlightColor="#c5c5c5">
        <App />
        <Toaster/>
        </SkeletonTheme>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
