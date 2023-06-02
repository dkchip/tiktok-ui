import useModal from '../hooks/useModal';
import Modal from '../components/Modal/ModalLogin/Modal';
import ModalUpdateProfile from '../components/Modal/ModalUpdateProfile/ModalUpdateProfile';
import { ModeBrowser } from '../components/ModeBrowser';
import { createContext, useState } from 'react';



export const ModalContextKeys = createContext();

function ModalContext({ children }) {

    // const dataAllVideo = useSelector((state)=>state.videos).dataAllVideos;
    const [indexVideo, setIndexVideo] = useState(0);
    const [typeModal,setTypeModal] = useState(null);

    const [ModalLogin, isShowingLogin] = useModal(Modal);
    const [ModalVideo, isShowingModalVideo, isShowing] = useModal(ModeBrowser);
    const [ModalUpdate,handleShowingModalUpdate,,,confirmModalUpdate] = useModal(ModalUpdateProfile)

    const handleAll = {
        isShowingLogin,
        isShowingModalVideo,
        setIndexVideo,
        indexVideo,
        isShowing,
        setTypeModal,
        handleShowingModalUpdate,
        confirmModalUpdate
    }



    return (
        <ModalContextKeys.Provider value={handleAll}>
            {children}

            <ModalLogin />
             <ModalVideo
                data={[  indexVideo, setIndexVideo,typeModal]}
            />
            <ModalUpdate />


        </ModalContextKeys.Provider>
    );
}

export default ModalContext;
