import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import { publicRoutes } from './routes';
import Mainlayout from './layouts/Mainlayout';
import ModalContext from './contexts/ModalContext';
import Cookies from 'js-cookie';
import { getAuth } from './services/userServices';
import { useDispatch } from 'react-redux';
import { setUser,deleteUser } from './store/slices/userSlice';



function App() {
    const dispatch = useDispatch();
    const [loadingData, setLoadingData] = useState(false);
    useEffect(() => {
        (function () {
            if (Cookies.get('tokenAuth')) {
                getAuth(Cookies.get('tokenAuth'))
                    .then((res) => {
                        dispatch(setUser(res.data))
                        setLoadingData(true);
                    })
                    .catch((e) => {});
            } else {
                dispatch(deleteUser({}));
                setLoadingData(true);
            }
        })();
    }, []);
    console.log(
        '%cCác bạn có thắc mắc hay feedback thì liên hệ với mình bằng cách quét mã QR ở mục đăng nhập Qr code nhé <3',
        'color:yellow;font-size:20px',
    );

    return (
        loadingData && (
            <Router>
                <div className="app">
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            let Layout = Mainlayout;
                            const Page = route.component;

                            if (route.layout === null) {
                                Layout = Fragment;
                            } else if (route.layout) {
                                Layout = route.layout;
                            }

                            return (
                                <Route
                                    
                                    key={index}
                                    path={route.path}
                                    element={
                                        <ModalContext>
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        </ModalContext>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </div>
            </Router>
        )
    );
}

export default App;
