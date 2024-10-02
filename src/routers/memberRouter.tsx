import {lazy, Suspense} from "react";
import LoadingPage from "../pages/LoadingPage.tsx";
import {Navigate} from "react-router-dom";

export const Loading = <LoadingPage></LoadingPage>

const AdminMemberListPage = lazy(() => import("../pages/member/AdminMemberListPage.tsx"))

const memberRouter = {
    path: '/member',
    element: <Suspense fallback={Loading}><MemberIndex/></Suspense>,
    children: [
        {
            path: "list",
            element: <Suspense fallback={Loading}><AdminMemberListPage/></Suspense>,
        },
        {
            path: "",
            element: <Navigate to='list' replace={true}></Navigate>
        },
        ]
}

export default memberRouter