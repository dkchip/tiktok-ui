import Home from "../pages/Home/index"
import UserPage from "../pages/UserPage"

import routesConfig from "../config/routes"
import Mainlayout from "../layouts/Mainlayout"
import UserLayout from "../layouts/UserlLayout"
const publicRoutes = [
    {
        path : routesConfig.home,
        component : Home,
        layout : Mainlayout
    },
    {
        path : routesConfig.profile,
        component : UserPage,
        layout : UserLayout
    }
]

const privateRoutes = []

export {publicRoutes,privateRoutes} 