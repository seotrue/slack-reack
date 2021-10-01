import React from 'react';
import { Header } from "@pages/DirectMessage/styles";
import { useParams } from "react-router";
import useSWR from 'swr';
import { IUser } from "@typings/db";
import fetcher from "@utils/fetcher";
import gravatar from "gravatar"

const DirectMessage = () => {
  const { workspace,id } = useParams<{ workspace?: string, id: string }>();
  const { data: userData } = useSWR<IUser>(`/api/workspaces/${workspace}/users/${id}`, fetcher);
  const { data: myData } = useSWR<IUser>(`/api/users`, fetcher);

  if(!userData || !myData) {
    // 로딩중이거나 내정보가 없으면 화면 띄우지 않기
    return  null
  }
  return(

    <Header>
      <img src={gravatar.url(userData.email,{s: '24px', d:'retro'})} alt={userData?.nickname}/>
      <span>={userData?.nickname}</span>

      {/*채팅목록*/}
      {/*채팅입력창*/}
      <ChatList />
      <ChatBox />
    </Header>

  )
};

export default DirectMessage;