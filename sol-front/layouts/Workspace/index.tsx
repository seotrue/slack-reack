import React, { VFC, useCallback, useState } from "react";
import useSWR from "swr/esm/use-swr";
import fetcher from "@utils/fetcher";
import axios from "axios";
import { Redirect, Switch, Route, Link } from "react-router-dom";
import {
  AddButton,
  Channels,
  Chats,
  Header, LogOutButton, MenuScroll,
  ProfileImg, ProfileModal,
  RightMenu, WorkspaceButton, WorkspaceModal,
  WorkspaceName, Workspaces,
  WorkspaceWrapper
} from "@layouts/Workspace/styles";
import gravatar from "gravatar"
import loadable from "@loadable/component";
import Menu from "@components/Menu";

import { Button, Input, Label } from "@pages/SignUp/styles";
import useInput from "@hooks/useInput";
import { IChannel, IUser } from "@typings/db";
import Modal from "@components/Modal";
import CreateChannelModal from '@components/CreateChannelModal/index'
import { toast } from "react-toastify";
import { useParams } from "react-router";
import InviteWorkspaceModal from "@components/InviteWorkspaceModal";
import DMList from "@components/DMList";
import ChannelList from "@components/ChannelList";

const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));

const Workspace:VFC = () => {
  const [ showUserMenu, setShowUserMenu ] = useState(false);
  const [ showCreateWorkspaceModal, setShowCreateWorkspaceModal ] = useState(false);
  const [ showWorkspaceModal, setShowWorkspaceModal ] = useState(false);
  const [ createChannelModal, setCreateChannelModal ] = useState(false);
  const [showInviteWorkspaceModal, setShowInviteWorkspaceModal] = useState(false);



  const [newWorkspace, onChangeNewWorkspace, setNewWorkspace] = useInput('');
  const [newUrl, onChangeNewUrl, setNewUrl] = useInput('');

  const { workspace } = useParams<{workspace: string}>();
  const { data: userDate, error, revalidate, mutate } = useSWR<IUser | false>('/api/users',fetcher);
  // swr 조건부 요청을 할수 잇음 userDate 가 잇으면 워크스페이스 별로 채널을 가져옴 아니면 요청 안함
  const { data: channelData } = useSWR<IChannel[]>(userDate ? `/api/workspaces/${workspace}/channels`:null, fetcher)


  const { data: memberData } = useSWR<IChannel[]>(userDate ? `/api/workspaces/${workspace}/channels`:null, fetcher)

  console.log(newWorkspace,'newWorkspace------')
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

  const onCloseModal = useCallback(() => {
    setShowCreateWorkspaceModal(false)
    setShowCreateWorkspaceModal(false);
    setShowInviteWorkspaceModal(false);
  },[]);

  const onClickWorkSpace = useCallback(()=> {
    setShowCreateWorkspaceModal(true)
  },[]);
  const onClickInviteWorkspace = useCallback(() => {
    setShowInviteWorkspaceModal(true);
  }, []);

  const onCreateWorkspace = useCallback((e)=> {
    console.log(newWorkspace,'머임')
    e.preventDefault(); // 새로고침 안되도록

    //필수값 유효성 체크
    if (!newWorkspace || !newWorkspace.trim()){
      console.log('1')

      return
    }
    if (!newUrl || !newUrl.trim()){
      console.log('2')
      return;
    }

    // api 전송(워크스페이스 생성하는)
    axios.post('/api/workspaces',{
      workspace: newWorkspace,
      url: newUrl
    },{
      withCredentials: true,// 내가 로그인 되어 잇는 상태란걸 쿠키 전달 해줌
    })
      .then(()=>{
          // 성공시 revalidate가 fetcher함수를 바로 부른다
          revalidate();
          setShowCreateWorkspaceModal(false);
         // 완료되면 인풋창들 비워두고
          setNewUrl('');
          setNewWorkspace('');
      })
      .catch((err) => {
        console.dir(err);
        // 에러 떳을때 에러 내용을 토스트팝업으로 하단 센터에서 나오도록
        toast.error(err.response?.data, {position: 'bottom-center'})
      })
  },[newWorkspace,newUrl]);

  const toggleWorkspaceModal = useCallback(() => {
    setShowWorkspaceModal((prev) =>!prev);
  },[]);

  const onClickAddChannel = useCallback(() => {
    setCreateChannelModal((prev)=>!prev );
  },[]);

   


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
        {/*
          Workspaces의 타입 에러가 난다 타입을 추가해줘야한다
          (@typings/db.ts) 서버 개발자가 api 전달 받은거 처럼 타입도 전달 받음
          api의 데이터들이 어떤 타입들이 가져잇는지 타입 정의
           useSWR<IUser>('/api/users',fetcher) 해주면 오류 사라짐

           */}
        <Workspaces>{userDate?.Workspaces.map((ws)  => {
          return(
            <Link key={ws.id} to={`/workspace/${123}/channel/일반`}>
              <WorkspaceButton>{ws.name.slice(0,1).toUpperCase()}</WorkspaceButton>
            </Link>
          )
        })}
        <AddButton onClick={onClickWorkSpace}>+</AddButton>
        </Workspaces>

        {/*채널*/}
        <Channels>
          <WorkspaceName onClick={toggleWorkspaceModal}>Sleact</WorkspaceName>
          <MenuScroll>
            <Menu show={showWorkspaceModal} onCloseModal={toggleWorkspaceModal} style={{top:95, left:80}}>
              <WorkspaceModal>
                <h2>Sleact</h2>
                <button onClick={onClickInviteWorkspace}>워크스페이스에 사용자 초대</button>
                <button onClick={onClickAddChannel}>채널 만들기</button>
                <button onClick={onLogout}>로그아웃</button>
              </WorkspaceModal>
            </Menu>
            <ChannelList />
            <DMList />
          </MenuScroll>
        </Channels>
        {/*디엠*/}
        <Chats>
          <Switch>
            <Route path={'/workspace/channel/:channel'} component={Channel}/>
            <Route path={'/workspace/dm/:id'} component={DirectMessage}/>
          </Switch>
        </Chats>
      </WorkspaceWrapper>
      {/*워크 스페이스 생성 모달: 원래는 인풋이 잇으면 컴포넌로빼라 이건 그냥예를 보여줄려고 안에 넣어둔거*/}
      <Modal show={showCreateWorkspaceModal} onCloseModal={onCloseModal}>
        <form onSubmit={onCreateWorkspace}>
          <Label id={'workspace-label'}>
            <span>워크스페이스 이름</span>
            <Input id={'workspace'} value={newWorkspace} onChange={onChangeNewWorkspace} />
          </Label>
          <Label id={'workspace-label'}>
            <span>워크스페이스 url</span>
            <Input id={'workspace-url'} value={newUrl} onChange={onChangeNewUrl} />
          </Label>
          <Button type={'submit'}>생성하기</Button>
        </form>
      </Modal>
      <CreateChannelModal show={createChannelModal} onCloseModal={onCloseModal} setShowCreateChannelModal={setCreateChannelModal}/>
      <InviteWorkspaceModal
        show={showInviteWorkspaceModal}
        onCloseModal={onCloseModal}
        setShowInviteWorkspaceModal={setShowInviteWorkspaceModal}
      />
    </div>
  )
};


export default Workspace