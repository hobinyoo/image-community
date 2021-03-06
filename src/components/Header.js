import React from "react";
import { Grid, Text, Button } from "../elements";
import { getCookie, deleteCookie } from "../shared/Cookie";

import { useDispatch, useSelector } from "react-redux"
import { actionCreators as userActions } from "../redux/modules/user";

import { history } from "../redux/configureStore";
import { apiKey } from "../shared/firebase";

const Header = (props) => {
    const dispacth = useDispatch()
    const is_login = useSelector((state) => state.user.is_login);
    
    const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
    //firebase api 인증키!
    const is_session = sessionStorage.getItem(_session_key)? true : false;
    //키 sessionStorage에서 키 값가져오기!
    
    if (is_login && is_session) {
        return (
            <React.Fragment>
                <Grid is_flex padding="4px 16px">
                    <Grid>
                        <Text margin="0px" size="24px" bold>헬로</Text>
                    </Grid>

                    <Grid is_flex>
                        <Button text="내정보"></Button>
                        <Button text="알림"></Button>
                        <Button text="로그아웃" _onClick={() => {
                            dispacth(userActions.logoutFB())
                        }}>
                        </Button>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <Grid is_flex padding="4px 16px">
                <Grid>
                    <Text margin="0px" size="24px" bold>
                        헬로
                    </Text>
                </Grid>

                <Grid is_flex>
                    <Button text="로그인" _onClick={() => {
                        history.push('/login')
                    }}></Button>
                    <Button text="회원가입" _onClick={() => {
                        history.push('/signup')
                    }}></Button>
                </Grid>
            </Grid>
        </React.Fragment>
    )


}

Header.defaultProps = {}

export default Header;