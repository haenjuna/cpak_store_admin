import {lazy, Suspense} from "react";
import LoadingPage from "../pages/LoadingPage.tsx";
import {Navigate} from "react-router-dom";

export const Loading = <LoadingPage></LoadingPage>

const AdminMemberListPage = lazy(() => import("../pages/member/AdminMemberListPage.tsx"))

const memberRouter = {
    path: '/member',
    children: [
        {
            path: "",
            element: <Navigate to='list' replace={true}></Navigate>
        },
        {
            path: "list",
            element: <Suspense fallback={Loading}><AdminMemberListPage/></Suspense>,
        },
        ]
}

export default memberRouter