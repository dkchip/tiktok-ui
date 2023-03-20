import useModal from '../hooks/useModal';
import Modal from '../components/Modal/Modal';
import { ModeBrowser } from '../components/ModeBrowser';
import { createContext, useRef, useState } from 'react';

export const ModalContextKeys = createContext();

function ModalContext({ children }) {
    const [indexVideo, setIndexVideo] = useState(0);
    const [dataVideo, setDataVideo] = useState({});
    const [dataAllVideo, setDataAllVideo] = useState();

    const [ModalLogin, isShowingLogin] = useModal(Modal);
    const [ModalVideo, isShowingModalVideo, isShowing] = useModal(ModeBrowser);

    const handleAll = useRef({
        isShowingLogin,
        isShowingModalVideo,
        setDataVideo,
        setIndexVideo,
        setDataAllVideo,
        dataAllVideo,
        indexVideo,
        isShowing,
    });

    return (
        <ModalContextKeys.Provider value={handleAll.current}>
            {children}

            <ModalLogin />
            <ModalVideo
                data={[dataVideo, dataAllVideo, indexVideo, setIndexVideo, setDataVideo]}
            />
        </ModalContextKeys.Provider>
    );
}

export default ModalContext;
