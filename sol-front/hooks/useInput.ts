import { Dispatch, SetStateAction, useCallback, useState } from 'react';
//TS가 인라인 콜백함수는 매개변수를 추론해줍니다
//const useInput = <T>(ininitialData: 매계변수 타입): 리턴값타입
type ReturnTypes<T = any> = [T, (e: any) => void, Dispatch<SetStateAction<T>>]
const useInput = <T = any>(ininitialData: T): ReturnTypes<T> => {
  const [value, setValue] = useState(ininitialData);
  const handler = useCallback((e) => {
    setValue(e.currentTarget.value);
  },[]);
  return [value, handler, setValue];
};

export default useInput;
