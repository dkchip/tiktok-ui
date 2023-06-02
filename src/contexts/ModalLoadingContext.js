import useToast from '../hooks/useToast';
import useModal from '../hooks/useModal';

import { createContext } from 'react';
import ModalLoading from '../components/Modal/ModalLoading/ModalLoading';
import ModalDiscard from '../components/Modal/ModalDiscard/ModalDiscard';
import ModalConfirm from "../components/Modal/ModalConfirm";
import ModalSuccessUpLoad from '../components/Modal/ModalSuccessUpLoad/ModalSuccessUpLoad';
import ToastMessage from '../components/ToastMessage/ToastMessage';
import ModalDeleteVideo from "../components/Modal/ModalDeleteVideo"

export const ModalLoadingContextKeys = createContext();

function ModalLoadingContext({ children }) {
    //Loading Modal
    const [ModalLoad,isShowingModalLoad,,isHideModalLoad] = useModal(ModalLoading);
    //Confirm Modal
    const [ModalDis,discardModalShowing,,discardModalHide,confirmDiscard] = useModal(ModalDiscard);
    const [ModalConf,confirmModalShowing,,confirmModalHide,confirmValue] = useModal(ModalConfirm);
    const [ModalSuccess,successModalShowing,,successModalHide,successValue] = useModal(ModalSuccessUpLoad);
    const [ModalDelete,handleShowingModalDelete, , ,deleteVideoValue ] = useModal(ModalDeleteVideo);
    

    //Toast Message
    const [ToastMessageComponent,handleToastShowing] = useToast(ToastMessage);

    const handleAll = {
        isShowingModalLoad,
        isHideModalLoad,
        discardModalShowing,
        discardModalHide,
        confirmDiscard,
        confirmValue,
        confirmModalHide,
        confirmModalShowing,
        ModalConf,
        successModalShowing,
        successModalHide,
        successValue,
        handleToastShowing,
        handleShowingModalDelete,
        deleteVideoValue
    };



    return (
        <ModalLoadingContextKeys.Provider value={handleAll}>
            {children}
            <ModalLoad />
            <ModalDis />
            <ModalConf />
            <ModalSuccess />
            <ToastMessageComponent />
            <ModalDelete />
        </ModalLoadingContextKeys.Provider>
    );
}

export default ModalLoadingContext;
