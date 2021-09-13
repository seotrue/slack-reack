## 폴더 구조
- page - 페이지의 진입점
- components - 공통되는 컴포넌트, 쪼갠 컴포넌트
- layouts -  공통되는 레이아웃


## 강의 정리

커스텀 훅
//TS가 인라인 콜백함수는 매개변수를 추론해줍니다
//const useInput = <T>(ininitialData: 매계변수 타입): 리턴값타입

프론트랑 백이랑 주소가 다르면 options 요청이 한번 더 감
백에서도 설정이 가능하지만 프론트쪽에서도 설정이 가능하다
devServer 설정
proxy 에러 피해갈수 잇다 이경운 둘다 백 프론트 로컬호스트 일경우에


로그아웃 하고 시푼면
개발자도구 - 애플리케이션 탭에서
connent.sid 삭제하면 된다
세션을 삭제하면 로그아웃 처리
or 백 서버 껏다끄면 됨

  // (주소, fetcher: 주소를 어떻게 처리할지를 적어주는 함수 )
  /*
    utill에 fetcher에 reponse.data로 리턴하기때문에 구조분해 해서
    const { data }가 들어가는거고 data가 없으면 로딩중인
   */
  const { data, error } = useSWR('http://locallhost:3095/api/users', fetcher);
swr 사용하기 (쿠키 공유하기)
swr은 get
swr은 넥스트 만든곳에서 만든거

swr은 다른탭 갓다가 오면 새로 다시 보낸다
// url : http://locallhost:3095/api/users
// 백이랑 프론트랑 도메인주소가 다르면 백에서 core 설정을 해줘서 core 에러는 안나지만
// 백 -> 프론트에서 쿠키를생성을 못해주고 프론트 -> 백으로 쿠키를 전달이 안됨
                                               // 그래서 get의 두번째 인자에 넣어줌 {withCredentials: true}
 post는 세번째 인자에 넣어줌 {withCredentials: true }
 
 쿠키는 백에서 생성
 그래서 프론트브라우저가 기억
 한번 기억한 쿠키를 매 요청마다 백으로 보냄
 
 - 화면에 반영 되는 데이터는 useState 
 - 화면에 반영 되지 않아두 되는 데이터는 useRef
 - 그냥 바로  let 을 써버리면 함수가 다시 호출되면서 바로 다시 선언 되버리기 때문에 hook 내에서 


### SWR
- withCredentials: 쿠키 공유 
- revalidate :내가 원할때 SWR 호출하게 하는 것[서바로 다시 요청보내서 데이터를 다시 갖고오는것]
- mutate:[서바로 다시 요청안보내거 데이터를 수정하는ㄴ것]
- dedupingInterval: 주기적으로 호출은 되지만 dedupingInterval 기간내에는 캐시에서 불러옴(내가 원하는 주기마다 호출 가능 ) 

### typescript
- FC: children 사용 시
- VFC children 미사용 시
###
- mutate - sholdRevaildate false
- 서버에 요청을 가기도 전에 화면에 데이터가 바뀌고 그이후에 서버에 점검 // 
- optimistic ui이라고 함: 낙관점인 ui ex) 좋아요 버튼 일단 하트에 불 들어 오고 그이후에 서버에 요청보내서 서버 랑 점검
dedupingInterval: swr을 아무리 마니 여청해두 실제로 서버에 캐시된것을 갖다쓴다

=> 구랴소 컴포넌트에서 swr을 남발한다고 걱정할필요 없음

swr이 꼭 비동기 요청에만 관련된ㄱ 아니다 전역 데이터 저장소이다!!!!!!!!

// 말단 컴포넌트는 메모 붙여준다


##### 레아아웃을 페이지에서 사용하는 방법 2가지
1.페이지 컴포넌트 상단에 레이아웃 컴포넌트로 감싸구 
> <WorkSpace><div>로그인 하신걸 ㅊㅋ</div<.WorkSpce>  

1.2 레이아앗 컴포넌트에선 프랍스로 children으로 받아서 하단에 {ㅊchildren} 뿌려준다

- 강의에서 적용된 방법
2. 워크스페이스(레이아웃 컴포넌트)에서 판단하기 내칠드런이 누가 될지 => 워크스페이스 컴포넌트에서 라우트를 사용하기 
2.2 레아이웃 안에서 라우트 를 또 슨다 => 주소가 일관적(계층적이면) 이방법


##### 모달류 만들기
- 재사용을 위해 컴포넌트로 따로 빼놓음
- 단일책임원칙: 하나의 컴초넌트는 하나의 역활만한다.=> 이거에 따라 컴포넌트 분리하는것두 권장

- 타입스크립트 할때는 props의 타입을 적어놓아야함
 
