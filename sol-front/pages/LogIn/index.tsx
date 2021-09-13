import useInput from '@hooks/useInput';
import { Button, Error, Form, Header, Input, Label, LinkContainer } from '@pages/SignUp/styles';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import useSWR from 'swr';

const LogIn = () => {
  // (주소, fetcher: 주소를 어떻게 처리할지를 적어주는 함수 )
  /*
    utill에 fetcher에 reponse.data로 리턴하기때문에 구조분해 해서
    const { data }가 들어가는거고 data가 없으면 로딩중인
   */
  // data ore error 값이 바뀌는 순간 리렌더링 된다
  const { data, error, revalidate, mutate } = useSWR('http://locallhost:3095/api/users', fetcher,{
    dedupingInterval: 100000,// 백초마다 한번씩 swr 호출 하겟다
  });
  const [logInError, setLogInError] = useState(false);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  // 내로그인 정보를 가져온 로그인이 되어있지 않으면 false를 리턴
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setLogInError(false);
      axios
        .post(
          '/api/users/login',
          { email, password },
          {withCredentials: true}
        )
        .then((response) => {
          // login 성공시 revalidate가 fetcher함수를 바로 부른다
          //revalidate()
          // 기존의 제정보를 data에 바로 넣어버이는것
          mutate(response.data, true);
        })
        .catch((error) => {
          setLogInError(error.response?.data?.statusCode === 401);
        });
    },
    [email, password],
  );

  // if (data === undefined){
  //   return <div>로딩중...</div>
  // }
  console.log(data,'data')
  if (data){

    return <Redirect to={'/workspace/channel'}/>
  }

  // console.log(error, userData);
  // if (!error && userData) {
  //   console.log('로그인됨', userData);
  //   return <Redirect to="/workspace/sleact/channel/일반" />;
  // }

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
          {logInError && <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>}
        </Label>
        <Button type="submit">로그인</Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <Link to="/signup">회원가입 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default LogIn;