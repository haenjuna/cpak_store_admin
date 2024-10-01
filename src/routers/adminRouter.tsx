import {createBrowserRouter} from "react-router-dom";
import {lazy, Suspense} from "react";
import LoadingPage from "../pages/LoadingPage.tsx";
import todoRouter from "./todoRouter.tsx";
import productRouter from "./productRouter.tsx";
import memberRouter from "./memberRouter.tsx";


const MainPage = lazy(() => import("../pages/MainPage"))
const Contact = lazy(() => import("../pages/Contact"))

export const Loading = <LoadingPage></LoadingPage>

const mainRouter = createBrowserRouter([
    {
        path: "/",
        element: <Suspense fallback={Loading}><MainPage/></Suspense> ,
    },
    {
        path: "/contact",
        element: <Suspense fallback={Loading}><Contact/></Suspense>
    },
    todoRouter,
    memberRouter,
    productRouter
])

export default mainRouter