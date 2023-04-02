import useModal from '../hooks/useModal';
import { createContext, useRef } from 'react';
import ModalLoading from '../components/ModalLoading/ModalLoading';

export const ModalLoadingContextKeys = createContext();

function ModalLoadingContext({ children }) {
    const [ModalLoad,isShowingModalLoad,temp,isHideModalLoad] = useModal(ModalLoading);
    const handleAll = useRef({
        isShowingModalLoad,
        isHideModalLoad
    });



    return (
        <ModalLoadingContextKeys.Provider value={handleAll.current}>
            {children}
            <ModalLoad></ModalLoad>
        </ModalLoadingContextKeys.Provider>
    );
}

export default ModalLoadingContext;
