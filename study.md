## 폴더 구조
- page - 페이지의 진입점
- components - 공통되는 컴포넌트, 쪼갠 컴포넌트
- layouts -  공통되는 레이아웃

## 서버 준비사항
// 프록시 서버
> npm i webpack-dev-server -D //D는 개발용
> npm i webpack-cli
>
- 프론트 실행시
> npm run dev
## 강의 정리

딱 하나의 컴포넌트에서만 사용하는 비동기의 경우

리덕스로 뺄 이유없다

=> 해당 컴포넌트 내에서 해결하자

01:08

수정

삭제
axios .post('주소',{

데이터(바디)

}).then(()=>{성공시})

.catch(()=>{실패시})

.finally(()=>{성공, 실패 공통으로 들어갈 })  =>>>> try catch 문에서도 사용 가능

02:17

수정

삭제
네트워크 탭

해더의 의미 알기

200번대 성공

https 적용 하기 

06:21

수정

삭제
프론트랑 백이랑 포트가 다르면 options? 같은 네트워크 탭에 보면 api 호출이 한번더 되어잇다

원래라면  백/프론트 주소가 다르면api 호출이 안된다

->  그냥 하면 Access to XMLHTTpREqust at '주소'...

관련 에러가 나오는데 해결 방벙은 2가지 잇다

1. 백엔드의 설정

2. 웹백 데브 서버에서 

프로시 서버설정을 하면 됨

/////

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
- console.trace

- 인풋이 잇으면 컴포넌트 분리하는게 좋타 => 온체인지 될때마다 리렌더링되기때문에
- 띄어쓰기 맞기 위해 trim()도 
>>npm i react-toastify

#### 체널 만드는 모달
- props로 받는 데이터를 타입 interface로 지정해준다

##### 주소 설계
1.라우터 파라미터
```
// A // 그래서 파라미터가 ㅇ안붙은 애가 온다면 먼자 써줘라 우선 순위 때문에  
<Route path="/workspace/slack" component={Wrokspce} />
// 뒤에 :를 붙이면 파라미터가 된다 자유롭게 값을 바꿀수 잇다 => 모든값을 받을수 잇다
<Route path="/workspace/:workspace" component={Wrokspce} />
// 그래서 파라미터가 ㅇ안붙은 애가 온다면 먼자 써줘라 
```
```
<Route path={'/workspace/channel/:channel'} component={Channel}/>
<Route path={'/workspace/dm/:id'} component={DirectMessage}/>
```
- 라우터에 `주소/:파리미터`로 사용할수 잇고 해당 주소를 데이터처럼 사용할수 잇는데 불러오는 법은 
```
// useParams를 사용해서 :channel, :workspace 를 파라마터롤 사용했기때문에 변수로 불러오고, 타입스트립트 사용하는 자는 useParams 뒤에 해당 객체 타입을 정의 해줘야한다.
const { workspace, channel } = useParams<{workspace: string, channel: string}>();

```

 
```javascript
const LogIn = () => {
  // (주소, fetcher: 주소를 어떻게 처리할지를 적어주는 함수 )
  /*
    utill에 fetcher에 reponse.data로 리턴하기때문에 구조분해 해서
    const { data }가 들어가는거고 data가 없으면 로딩중인
   */
  // data ore error 값이 바뀌는 순간 리렌더링 된다
  const { data, error, revalidate, mutate } = useSWR('/api/users', fetcher,{
    //dedupingInterval: 100000,// 백초마다 한번씩 swr 호출 하겟다
  }); // => 밑에 axios 로그인이 되면 해당 유저 정보를 갖고온다 만약 로그인이 안되어 잇으면 해당 유저 정보가 false 로 가져온다
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
    [email, password, mutate]
  );

```
>  console.dir(err)
 ### 배포 환경
 - webpack.config.ts의 devSever 옵션은 개발환경 옵션이기 때문에 배포시 자동적으로 적용이 안된다
 
##### <NavLink>
- activceClassName 속성 을 가짐


### useCallback
- useCallbalck 함수 기준으로 외부 변수면 deps에 써주고 내부변수면 안써주고
useCallback : 성능 최적화

함수 컴포넌트는 매번 전체 함수가 매번 재실행하기 때문에

useCallback으로 서능 최적화

되서 재생성 되서 유지 콜벨 사용

의미는  이 함수를 캐싱 해둬라

deps로 주는 값이  바뀌면 새로운 함수로 재실해 해라

### 웹소켓: 실사간으로 이벤트를 주고 받을때 (양방향)
- 프론트와 서버가 서로 양방향으로 실시간 전송 가능
- 백엔드에두 셋업을 해놓아야함
> npm i socket,io-client@2 // 설치 node 쪽 라이브러리

- 한번 연결해놓으면 전역적으로 맺어짐 -> 약간 리액트랑은 어울리지는 않음 전역적으로 맺어지기 때문에
하나의 컴포넌트를 맺어 놓으면 그 컴포넌트가 다 전역적으로 쓴다?
- 컴포넌트 간의 공통적인걸 할경우 화면단은 없구 로직 만 잇을경우 hook경로에서 해줘도 됨

ic

# 211127 추가내용

엄격하게 린트 체크 해주면 eslint로
추가 해주자
대신 마니 설치해줘야함
npm i -D eslint-config-react-app eslint-plugin-flowtype eslint-plugin-import eslint-plugin-jsx-ally
\
=> 그래야 훅에 유즈 콜백에 디팬더시 빼먹어도 표시가 잘 될꺼임
외부에서 쓰이는 거면 무조건 넣어라, 

.eslinttrc에서 추가해줘라

웹소켓 사용: 실시간 서버와 주고받을때
양방향

백엔드에 셋팅완료 후에 프론트 사용 가눙
npm i socket.io-client@2 
npm run dev

소켓은 리액트랑 잘 어울리진 않음
하나의 컴포넌트로 연결햇다 다른 연결하면 끊어질수 잇음
-> 그래서 공통된 컴포넌트에 넣어줌

화면단이 없구 로직단만 읷을경우
훅 폴더에 넣어줌

io.connecct 연결
.emit(보낼이벤트이름, 데이터) 데이터 보내고
.on('이벤트 이름, 데이터 받은후 처리하는 콜백함수) //서버 -> 프론트 데이터 받을때
disconnet) // 한번 맺은 소켓을 끊는 함수

동시에 워크스페잇, dm 이용할수 잇으니깐 소켓을 객체로 만들어서, 



정규식 라이브러리 ;
regexftString =>
 입력값을 줄바꿈을 넣어서 정규식으로 줄바꿈한 부분을 찾아줌 => <br>로 바꿔주면 채팅 친 화면에 <br>로 보임

말단 ㅌ컴포넌트는 memo로 감싸주기(컴포넌트를 캐싱하는 것는 memo) => props가똑같으면 부모가 바꿧두 자식을 리렌더링 안해주는 역활!!!!!! 원레는 부모가 바뀌면 자식두 리렌데링 하는데!!! 그걸 막아줌!!!

// 캐싱을 갱신할껄 디펜던시에 적어준다
값을 캐싱하기 위해서는 useMome

### 날짜별로 묶어주기
1. 서버에서 처음부터 그룹화
2. 프론트에서 작업 => 서버의 부담감이 줄어든다
 => 프론트 보안이 취약 => 보안에 위협되지 않구, 성능에 문제가 없을때까진 프론트에서 처리

기존 배열 남기구 새배열로 작업 immutable
position: sticky  => 평소에는 일반 요소처럼 있다가 특정 높이가 되면 fixed 처럼 바뀌는게 특징


 

### 리버스 인피니트 스크롤링  이 챕터 다시 듣기 


리버스 인피니트 스크롤링 => 위로 올리면서 기존 데이터를 불러와야하니깐
 
scrollBarRef :  스크로바를 컨트ㅗㄹ할수 잇는 얘를 ref를 만듬
 
forwardRef = > ref 전달하기는 일부 컴포넌트가 수신한 ref 를 받아 조금 더 아래로 전달할수 있는 기능
ref 받을 컴포넌트를 forwardRef  함수로 감싸준다

swr에선 인피니트 기능을 제공한다
인피니트되면서 챗릿트가 이차원 배열로 변경된다

### 스크롤바 조절하기챕터
채팅치면 딜레이 가 잇음 -> post 하구 ㅇ응답 받는 시간이 걸리기 때문에
이럴때 사용하는게  옵티미스 ui?  front 먼저 성공시키고(사용자 에게  먼저 그렇게 보여줌) 그다음에 서버로 보낸다

임의로 데이터를 만들어 내야함 => 서버쪽에 갓다오지 않앗지만 갓다온척 데이터 잇는척
mutate안에 미리 받을 데이터를 더미 형식으로 넣어줌
그리고 옵티미스 ui은 shouldRevaildate가 false 

