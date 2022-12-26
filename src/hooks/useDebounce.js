import {useEffect,useState} from "react";

function useDebounce(value,time) {
    const [debounceValue,setDebounceValue] = useState(value);

    useEffect(()=>{
        const handle =  setTimeout(()=>{
            setDebounceValue(value)
        },time);

        return ()=>{clearTimeout(handle)}
    },[value])
    return debounceValue;
}

export default useDebounce;