import useModal from '../hooks/useModal';
import { createContext } from 'react';
import ModalLoading from '../components/Modal/ModalLoading/ModalLoading';
import ModalDiscard from '../components/Modal/ModalDiscard/ModalDiscard';
import ModalConfirm from "../components/Modal/ModalConfirm";
import ModalSuccessUpLoad from '../components/Modal/ModalSuccessUpLoad/ModalSuccessUpLoad';

export const ModalLoadingContextKeys = createContext();

function ModalLoadingContext({ children }) {
    const [ModalLoad,isShowingModalLoad,,isHideModalLoad] = useModal(ModalLoading);

    const [ModalDis,discardModalShowing,,discardModalHide,confirm] = useModal(ModalDiscard);
    const [ModalConf,confirmModalShowing,,confirmModalHide,confirmValue] = useModal(ModalConfirm);
    const [ModalSuccess,successModalShowing,,successModalHide,successValue] = useModal(ModalSuccessUpLoad);
    const handleAll = {
        isShowingModalLoad,
        isHideModalLoad,
        discardModalShowing,
        discardModalHide,
        confirm,
        confirmValue,
        confirmModalHide,
        confirmModalShowing,
        ModalConf,
        successModalShowing,
        successModalHide,
        successValue
    };



    return (
        <ModalLoadingContextKeys.Provider value={handleAll}>
            {children}
            <ModalLoad />
            <ModalDis />
            <ModalConf />
            <ModalSuccess />
        </ModalLoadingContextKeys.Provider>
    );
}

export default ModalLoadingContext;
