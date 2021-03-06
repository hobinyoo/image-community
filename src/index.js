import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './shared/App';
import reportWebVitals from './reportWebVitals';
import store from "./redux/configureStore";
import { Provider } from "react-redux";
//provider로 스토어 주입!
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// 이부분이 index.html에 있는 div#root에 우리가 만든 컴포넌트를 실제로 랜더링하도록 연결해주는 부분입니다.
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();