import {createBrowserRouter} from "react-router-dom";
import {lazy, Suspense} from "react";
import memberRouter from "./memberRouter.tsx";
import adminProductRouter from "./adminProductRouter.tsx";

const MainPage = lazy(() => import("../pages/MainPage"))

export const Loading = <LoadingPage></LoadingPage>

const adminRouter = createBrowserRouter([
    {
        path: "/",
        element: <Suspense fallback={Loading}><MainPage/></Suspense> ,
    },
    adminProductRouter,
    memberRouter
])

export default adminRouter