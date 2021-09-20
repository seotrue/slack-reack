import axios from 'axios';
// url : http://locallhost:3095/api/users
// 백이랑 프론트랑 도메인주소가 다르면 백에서 core 설정을 해줘서 core 에러는 안나지만
// 백 -> 프론트에서 쿠키를생성을 못해주고 프론트 -> 백으로 쿠키를 전달이 안됨
// 그래서 get의 두번째 인자에 넣어줌(withCredentials)

//백에서 쿠키생성 프론트 전달 그ㅡ리고 ㅍ프론트에서 백으로 전달 할때 브라우저가  브러우저가 쿠키를 기억해야서 백으로 보냄
const fetcher = (url: string) => axios.get(url,{
  withCredentials: true,
}).then((response)=> response.data);

export default fetcher;