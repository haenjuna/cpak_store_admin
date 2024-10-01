import {Navigate} from "react-router-dom";
import {lazy, Suspense} from "react";
import LoadingPage from "../pages/LoadingPage.tsx";


const Loading = <LoadingPage></LoadingPage>
const AdminProductListPage = lazy(() => import("../pages/product/AdminProductListPage"))
const AdminProductModifyPage = lazy(() => import("../pages/product/AdminProductModifyPage.tsx"))
const AdminProductReadPage = lazy(() => import("../pages/product/AdminProductReadPage.tsx"))
const AdminProductRegisterPage = lazy(() => import("../pages/product/AdminProductRegisterPage"))

const adminProductRouter = {
    path: '/product',
    element: <Suspense fallback={Loading}><ProductIndex/></Suspense>,
    children: [
        {
            path: "list",
            element: <Suspense fallback={Loading}><AdminProductListPage/></Suspense>,
        },
        {
            path: "",
            element: <Navigate to='list' replace={true}></Navigate>
        },
        {
            path: "register",
            element: <Suspense fallback={Loading}><AdminProductRegisterPage/></Suspense>,
        },
        {
            path: "read/:pno",
            element: <Suspense fallback={Loading}><AdminProductReadPage/></Suspense>
        },
        {
            path: "modify/:pno",
            element: <Suspense fallback={Loading}><AdminProductModifyPage/></Suspense>
        }
    ]

}

export default adminProductRouter