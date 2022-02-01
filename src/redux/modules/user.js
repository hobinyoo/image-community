import { createAction, handleActions } from "redux-actions";
//액션을 편하게, 리듀서를 편하게 만들어주려고
import { produce } from "immer";
//불변성 관리
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";

import { auth } from "../../shared/firebase";
import firebase from 'firebase/compat/app';

// actions
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

// action creators
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));

// initialState
const initialState = {
  user: null,
  //로그인 안했을거니까
  is_login: false,
  //아무것도 안되있을테니까
};

// middleware actions
const loginFB = (id, pwd) => {
  return function (dispatch, getState, { history }) {
    
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then((res) => {
      //상태지속! 새로고침을 눌러도 새창이 안되게! session(창을 닫지않으면계속남아있다)에 keyapi를 전달하면됨! session에 키값이 전달됨!
      auth
        .signInWithEmailAndPassword(id, pwd)
        .then((user) => {
          console.log(user);
          
          dispatch(
            setUser({
              user_name: user.user.displayName,
              id: id,
              user_profile: "",
              uid: user.user.uid,
            })
          );

          history.push("/");
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;

          console.log(errorCode, errorMessage);
        });
    });
  };
};

const signupFB = (id, pwd, user_name) => {
  //id는 이메일 형식! 받아올 데이터
  return function (dispatch, getState, { history }) {
    auth
      .createUserWithEmailAndPassword(id, pwd)
      .then((user) => {
        console.log(user);
        //여기 까진 유저와 pwd만 넘어와서 닉네임 업데이트를 해주어야함!
        auth.currentUser
        //파이어베이스의 유저정보를 업데이트 해주겠다.
          .updateProfile({
            displayName: user_name,
          })
          .then(() => {
            //.then 성공했을때 이곳으로 들어온다!
            dispatch(
              setUser({
                //액션 creater
                user_name: user_name,
                id: id,
                user_profile: "",
                uid: user.user.uid,
              })
            );
            history.push("/");
          })
          //여기까지하면 파이어베이스에 유저정보가 저장이된다!
          .catch((error) => {
            console.log(error);
          });

        // Signed in
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode, errorMessage);
        // ..
      });
  };
};

//로그인하고 새로고침눌러도 리덕스가 날아가면 안되니까
//자체적으로 저장해놓은 것을 인증의 함수를 사용해서 값을 가지고와서 다시 리덕스에 넣어줌!
const loginCheckFB = () => {
  return function (dispatch, getState, {history}){
    auth.onAuthStateChanged((user) => {
      //이 유저가 있냐없냐? 확인!
      if(user){
        dispatch(
          setUser({
            user_name: user.displayName,
            user_profile: "",
            id: user.email,
            uid: user.uid,
            //고유값
          })
        );
      }else{
        dispatch(logOut());
      }
    })
  }
}

const logoutFB = () => {
  return function (dispatch, getState, {history}) {
    auth.signOut().then(() => {
      dispatch(logOut());
      history.replace('/');
    })
  }
}


//immer가 어떻게 내부적으로 불변성을 유지해주냐면 A라는 것을 불변성을 유지하면서 고치고 싶다.
//immer가 A를 받아서 A`를 만든다  A`를 고친다
// reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        //produce는 원본값 draft는 복사한 값(A`)
        setCookie("is_login", "success");
        draft.user = action.payload.user;
        //is_login이 true가 되어야 하고 user에는 어떤 정보값이 들어가야한다.
        //payload를 해야 넘겼던 user의 값을 가져올 수 있다. draft.user 는 복사한값의 유저!
        draft.is_login = true;
        //false는 true로 바꿔줌!
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("is_login");
        draft.user = null;
        draft.is_login = false;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
  //원래 여기에 뭐가 있었는지! 기본값!!
);

// action creator export
const actionCreators = {
  logOut,
  getUser,
  signupFB,
  loginFB,
  loginCheckFB,
  logoutFB
};

export { actionCreators };