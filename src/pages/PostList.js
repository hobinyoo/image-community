import React from "react";
import { useSelector, useDispatch } from "react-redux"

import Post from "../components/Post";
import {actionCreators as postActions} from "../redux/modules/post";

const PostList = (props) => {
    const post_list = useSelector((state) => state.post.list)
    const dispacth = useDispatch();
    
    React.useEffect(() => {
        if(post_list.length === 0) {
            //이미 리스트 길이가 있으면 새로 불러오지 않음
            dispacth(postActions.getPostFB());
        }
    }, []) 

    return(
        <React.Fragment>
            {/* <Post/> */}
            {post_list.map((p, idx) => {
                return <Post key={p.id} {...p}/>
                //p에 대한 모든정보! ,map를 써주려면 key를 넘겨줘야함!
            })}
        </React.Fragment>
    )}


export default PostList;