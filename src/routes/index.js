import Home from "../pages/Home/index"
import UserPage from "../pages/UserPage"

import Mainlayout from "../layouts/Mainlayout"
import UserLayout from "../layouts/UserlLayout"
const publicRoutes = [
    {
        path : '/',
        component : Home,
        layout : Mainlayout
    },
    {
        path : '/user',
        component : UserPage,
        layout : UserLayout
    }
]

const privateRoutes = []

export {publicRoutes,privateRoutes} 