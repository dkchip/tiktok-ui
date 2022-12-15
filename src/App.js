import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';
import { publicRoutes } from './routes';
import Mainlayout from './layouts/Mainlayout';

function App() {
    return (
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
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
