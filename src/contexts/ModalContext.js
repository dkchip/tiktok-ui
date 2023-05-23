import useModal from '../hooks/useModal';
import Modal from '../components/Modal/ModalLogin/Modal';
import { ModeBrowser } from '../components/ModeBrowser';
import { createContext, useRef, useState } from 'react';


export const ModalContextKeys = createContext();

function ModalContext({ children }) {

    // const dataAllVideo = useSelector((state)=>state.videos).dataAllVideos;
    const [indexVideo, setIndexVideo] = useState(0);
    const [typeModal,setTypeModal] = useState(null);

    const [ModalLogin, isShowingLogin] = useModal(Modal);
    const [ModalVideo, isShowingModalVideo, isShowing] = useModal(ModeBrowser);
    const handleAll = useRef({
        isShowingLogin,
        isShowingModalVideo,
        setIndexVideo,
        indexVideo,
        isShowing,
        setTypeModal
    });



    return (
        <ModalContextKeys.Provider value={handleAll.current}>
            {children}

            <ModalLogin />
            {/* <ModalVideo
                data={[ dataAllVideo, indexVideo, setIndexVideo]}
            /> */}
             <ModalVideo
                data={[  indexVideo, setIndexVideo,typeModal]}
            />

        </ModalContextKeys.Provider>
    );
}

export default ModalContext;
