import { createAction, handleActions } from "redux-actions";
import { produce } from "immer"
import { firestore } from "../../shared/firebase";
import "moment";
import moment from "moment";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";

const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));

const initialState = {
    list: [],
}

const initialPost = {
    // id: 0,
    // user_info: {
    //     user_name: "hobin",
    //     user_profile: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
    // },
    image_url: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
    contents: "",
    comment_cnt: 0,
    insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
}

const addPostFB = (contents = "") => {
    return function (dispatch, getState, { history }) {
      const postDB = firestore.collection("post");
  
      const _user = getState().user.user;
      const user_info = {
        user_name: _user.user_name,
        user_id: _user.uid,
        user_profile: _user.user_profile,
      };
  
      const _post = {
        ...initialPost,
        contents: contents,
        insert_dt: moment().format("YYYY-MM-DD hh:mm:ss")
      };
      // 잘 만들어졌나 확인해보세요!!
     
  
      postDB.add({...user_info, ..._post}).then((doc) => {
          // 아이디를 추가해요!
          let post = {user_info, ..._post, id: doc.id};
          dispatch(addPost(post));
          history.replace("/");
      }).catch((err) => {
          console.log('post 작성 실패!', err);
      });
    };
  };

const getPostFB = () => {
    return function (dispatch, getState, { history }) {
        const postDB = firestore.collection("post");

        postDB.get().then((docs) => {
            let post_list = [];

            docs.forEach((doc) => {
                // 잘 가져왔나 확인하기! :)
                // 앗! DB에서 가져온 것하고 우리가 Post 컴포넌트에서 쓰는 데이터 모양새가 다르네요!
                // console.log(doc.id, doc.data());

                // 데이터 모양을 맞춰주자!
                let _post = doc.data();

                //key값들을 배열로 만들어준다 ['comenet_cnt', 'contents', ...]
                let post = Object.keys(_post).reduce((acc, cur) => {
                    //acc는 원래 있던 값!
                    //키값에 usr_가  포함이 된다면을 아래처럼 써줌
                    if(cur.indexOf("user_") !== -1) {
                        return {...acc, 
                            user_info: {...acc.user_info, [cur]: _post[cur]}};
                    }
                    return { ...acc, [cur]: _post[cur] };
                    //[]넣어주면 변수안에 담긴 키값을 넣어줄 수 있다.
                }, { id: doc.id, user_info: {}});

                //   let post = {
                //       id: doc.id,
                //       user_info: {
                //           user_name: _post.user_name,
                //           user_profile: _post.user_profile,
                //           user_id: _post.user_id,
                //       },
                //       contents: _post.contents,
                //       image_url: _post.image_url,
                //       comment_cnt: _post.comment_cnt,
                //       imsert_dt: _post.insert_dt
                //   }

                post_list.push(post);
            });

            // 리스트 확인하기!
            console.log(post_list);

            dispatch(setPost(post_list));
        });
    };
};

export default handleActions(
    {
        [SET_POST]: (state, action) => produce(state, (draft) => {
            draft.list = action.payload.post_list
        }),

        [ADD_POST]: (state, action) => produce(state, (draft) => {
            draft.list.unshift(action.payload.post);
        })
    }, initialState
);

const actionCreators = {
    setPost,
    addPost,
    getPostFB,
    addPostFB,
}

export { actionCreators };