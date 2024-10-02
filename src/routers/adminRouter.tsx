
import {lazy, Suspense} from "react";

import LoadingPage from "../pages/LoadingPage.tsx";
import {createBrowserRouter} from "react-router-dom";
import memberRouter from "./memberRouter.tsx";
import adminProductRouter from "./adminProductRouter.tsx";

const AdminMainPage = lazy(() => import("../pages/AdminMainPage.tsx"))

export const Loading = <LoadingPage></LoadingPage>

const adminRouter = createBrowserRouter([
    {
        path: "/",
        element: <Suspense fallback={Loading}><AdminMainPage/></Suspense> ,
    },
    adminProductRouter,
    memberRouter
])

export default adminRouter