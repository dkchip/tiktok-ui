import HomePage from '../pages/Home/index';
import UserPage from '../pages/UserPage';
import Live from '../pages/Live';
import Following from '../pages/Following';
import routesConfig from '../config/routes';
import Mainlayout from '../layouts/Mainlayout';
import UserLayout from '../layouts/UserlLayout';
const publicRoutes = [
    {
        path: routesConfig.home,
        component: HomePage,
        layout: Mainlayout,
    },
    {
        path: routesConfig.profile,
        component: UserPage,
        layout: UserLayout,
    },
    {
        path: routesConfig.live,
        component: Live,
        layout: UserLayout,
    },
    {
        path: routesConfig.following,
        component: Following,
        layout: Mainlayout,
    }
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
