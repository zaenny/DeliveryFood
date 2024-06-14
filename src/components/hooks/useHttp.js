import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config){
    const response = await fetch(url, config);
    const resData = await response.json();

    if(!response.ok){
        throw new Error(resData.messagee || 'Something went wrong!');
    }

    return resData;
}

export default function useHttp( url, config, initialData) {

    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    // useCallback으로 감싸두면 왜 재생성 될 수 없는거지..?
    const sendRequest = useCallback( async function sendRequest(){
        setIsLoading(true);
        try{
            const resData = await sendHttpRequest(url, config);
            setData(resData);
        }catch(error){
            setError(error.messagee || 'Something went wrong!');
        }
        setIsLoading(false);
    },[url, config]);

    // 무한루프가 일어나는 이유 useEffect의 의존성이 계속 재생성되는데 커스텀 훅을 호출하는 컴포넌트가 재실행될때 마다 의존성 또한 재생성되고 있ㄷ다. 
    useEffect(()=>{
        // !confing 의미는 표준요청 
        if( config && (config.method === 'GET' || !config.method) || !config ){
            sendRequest();
        }
    },[sendRequest])

    return {
        data
        , isLoading
        , error
        , sendRequest
    }
}