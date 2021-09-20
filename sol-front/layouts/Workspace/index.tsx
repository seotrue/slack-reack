import React, { FC, useCallback, useState } from "react";
import useSWR from "swr/esm/use-swr";
import fetcher from "@utils/fetcher";
import axios from "axios";
import { Redirect, Switch, Route, Link } from "react-router-dom";
import {
  Channels,
  Chats,
  Header, LogOutButton, MenuScroll,
  ProfileImg, ProfileModal,
  RightMenu, WorkspaceButton,
  WorkspaceName,
  WorkspaceWrapper
} from "@layouts/Workspace/styles";
import gravatar from "gravatar"
import loadable from "@loadable/component";
import Menu from "@components/Menu";

const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));

const Workspace:FC = ({children}) => {
  const { data: userDate, error, revalidate, mutate } = useSWR('/api/users',fetcher);
  const [ showUserMenu, setShowUserMenu ] = useState(false);
  const onLogout = useCallback(() => {
    axios.post('/api/users/logout', null,{
      withCredentials: true,
    })
      .then(()=>{
        mutate(false, false)
      })
  },[]);

  const onClickUserProfile = useCallback(() => {
    console.log("클릭");
    setShowUserMenu((prev) => !prev)
  },[]);
  console.log(userDate,'유저데이터');
  // 이거 아래에 함수 넣으면 에러 난다 -> 리턴 아래에 훅(함수0)가 잇으면 안된다
  // invalid hook call Error => 1. 리턴 아래에 훅이 잇을때, 2. 반복문안에 훅 or 조건문 안에 훅 넣엇을때
  if (!userDate) {
    return <Redirect to="/login" />;
  }

  return(
    <div>
      <Header>
        <RightMenu>
          <span onClick={onClickUserProfile}>
            <ProfileImg src={gravatar.url(userDate.email, {s: '28px', d: 'retro'})} alt={userDate.nickname} />
          </span>
          {showUserMenu &&
          <Menu style={{ right:0, top: 38}} show={showUserMenu} onCloseModal={onClickUserProfile}>
            <ProfileModal>
              <img src={gravatar.url(userDate.email, {s: '28px', d: 'retro'})} alt={userDate.nickname} />
              <div>
                <span id={'profile-name'}>{userDate.nickname}</span>
                <span id={'profile-active'}>Active</span>
              </div>
            </ProfileModal>
            <LogOutButton onClick={onLogout}>로그아웃</LogOutButton>
          </Menu>}
        </RightMenu>
      </Header>
      <WorkspaceWrapper>
        {/* 워크스페이스 */}
        {/*<Workspace>*/}
        {/*  /!*{userDate?.Workspaces.map((ws) => {*!/*/}
        {/*  /!*  return(*!/*/}
        {/*  /!*    <Link key={} to={}>*!/*/}
        {/*  /!*      <WorkspaceButton></WorkspaceButton>*!/*/}
        {/*  /!*    </Link>*!/*/}
        {/*  /!*  )*!/*/}
        {/*  /!*})}*!/*/}
        {/*</Workspace>*/}
        {/*채널*/}
        <Channels>
          <WorkspaceName>Sleact</WorkspaceName>
          <MenuScroll>menu scroll</MenuScroll>
        </Channels>
        {/*디엠*/}
        <Chats>
          <Switch>
            <Route path={'/workspace/channel'} component={Channel}/>
            <Route path={'/workspace/dm'} component={DirectMessage}/>
          </Switch>
        </Chats>
      </WorkspaceWrapper>
    </div>
  )
};


export default Workspace