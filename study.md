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
 
 
