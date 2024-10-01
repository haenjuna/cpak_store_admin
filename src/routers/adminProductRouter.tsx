import {createBrowserRouter} from "react-router-dom";
import {lazy, Suspense} from "react";

const MainPage = lazy(() => import("../pages/MainPage"))


export const Loading = <LoadingPage></LoadingPage>

const adminProductRouter = createBrowserRouter([
    {
        path: "/",
        element: <Suspense fallback={Loading}><MainPage/></Suspense> ,
    },
])

export default adminProductRouter