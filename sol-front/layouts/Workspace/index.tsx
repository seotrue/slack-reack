import React, { FC, useCallback } from "react";
import useSWR from "swr/esm/use-swr";
import fetcher from "@utils/fetcher";
import axios from "axios";
import { Redirect, Switch, Route } from "react-router-dom";
import {
  Channels,
  Chats,
  Header, MenuScroll,
  ProfileImg,
  RightMenu,
  WorkspaceName,
  WorkspaceWrapper
} from "@layouts/Workspace/styles";
import gravatar from "gravatar"
import loadable from "@loadable/component";
import Menu from "@components/Menu";

const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));

const Workspace:FC = ({children}) => {
  const { data, error, revalidate, mutate } = useSWR('http://locallhost:3095/api/users',fetcher);
  const onLogout = useCallback(() => {
    axios.post('http://localhost:3095/api/users/logout', null,{
      withCredentials: true,
    })
      .then(()=>{
        mutate(false, false)
      })
  },[]);

  if (!data){
    return <Redirect to={'/login'} />
  }

  return(
    <div>
      <Header>
        <RightMenu>
          <span>
            <ProfileImg src={gravatar.url(data.email, {s: '28px', d: 'retro'})} alt={data.nickname} />
          </span>
          <Menu>
            프로필 메뉴
          </Menu>
        </RightMenu>
      </Header>
      <button onClick={onLogout}>로그아웃</button>
      <WorkspaceWrapper>
        {/* 워크스페이스 */}
        <Workspace>test</Workspace>
        {/*채널*/}
        <Channels>
          <WorkspaceName>Sleact</WorkspaceName>
          <MenuScroll>menu scroll</MenuScroll>
        </Channels>
        {/*디엠*/}
        <Chats>
          <Switch>
            <Route path={'workspace/channel'} component={Channel}/>
            <Route path={'workspace/dm'} component={DirectMessage}/>

          </Switch>
        </Chats>
      </WorkspaceWrapper>
      {children}
    </div>
  )
};

export default Workspace