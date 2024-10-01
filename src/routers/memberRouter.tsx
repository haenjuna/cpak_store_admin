import {createBrowserRouter} from "react-router-dom";
import {lazy, Suspense} from "react";

const MainPage = lazy(() => import("../pages/MainPage"))
const Contact = lazy(() => import("../pages/Contact"))

export const Loading = <LoadingPage></LoadingPage>

const memberRouter = createBrowserRouter([
    {
        path: "/",
        element: <Suspense fallback={Loading}><MainPage/></Suspense> ,
    },
    {
        path: "/contact",
        element: <Suspense fallback={Loading}><Contact/></Suspense>
    },
])

export default memberRouter