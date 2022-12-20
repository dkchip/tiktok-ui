import {forwardRef,useState} from 'react'
import images from '../../asset/img'
// import style from './Image.module.scss'


const Image = forwardRef(({src,alt,...props},ref) => {
    const [_fallBack,setFallBack] = useState('')
    const handleErro = ()=>{
        setFallBack(images.noImage)
    }

    return ( <img ref={ref} src = {_fallBack || src} alt = {alt}  {...props} onError = {handleErro} /> );
})

export default Image;