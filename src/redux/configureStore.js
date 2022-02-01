import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";
import user from "./modules/user";

// const middlewares = [thunk];
export const history = createBrowserHistory();
//리덕스 상에서 페이지 이동을 하고 싶을때! 비동기 후처리 .then()같은거찍고 이동하고 싶을때
//로그인이 완벽하게 되었을때 메인페이지로 보내고 싶어!

const rootReducer = combineReducers({
  user: user,
  router: connectRouter(history),
  //리덕스에 넣어줌 우리가 만든 history랑 router가 연결이 됨!
});
//user에 있는 모든 것!

const middlewares = [thunk.withExtraArgument({history: history})];
//미들웨어에 청크를 써서 단계를 놓을 수 있음 청크에서 history를 쓸거임!


// 지금이 어느 환경인 지 알려줘요. (개발환경, 프로덕션(배포)환경 ...)
const env = process.env.NODE_ENV;

// 개발환경에서는 로거라는 걸 하나만 더 써볼게요.
if (env === "development") {
    const { logger } = require("redux-logger");
    middlewares.push(logger);
}
//개발환경일때 패키지 가지고와!
const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        })
        : compose;
//window일때 데브툴즈 쓸거야

const enhancer = composeEnhancers(
    applyMiddleware(...middlewares)
);
//모든 middlewares 묶어서 사용할거야 

let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();