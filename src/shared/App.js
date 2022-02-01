import React from 'react';
import { Route } from "react-router-dom"
import PostList from '../pages/PostList';
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import { Grid } from "../elements";
import Header from "../components/Header";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
//우리가 만든 history에 넘겨주고 싶을때!
import {useDispatch} from "react-redux";
import {actionCreators as userActions} from "../redux/modules/user";

import {apiKey} from "./firebase";

function App() {
  const dispatch =  useDispatch();

  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key)? true : false;
  
 
  React.useEffect(() => {
    if(is_session){
      dispatch(userActions.loginCheckFB());
    }
  }, []); 
//[]값들이 바뀔 때 useeffect안에 함수를 재실행시켜줌! 컴포넌트 디드마운트역할을 수행해줌!

  return (
    <React.Fragment>
      <Grid>
        <Header></Header>
        <ConnectedRouter history={history}>
          <Route path="/" exact component={PostList} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup}/>
        </ConnectedRouter>
      </Grid>
    </React.Fragment>
  );
}

export default App;
