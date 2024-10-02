import BasicLayout from "../layouts/MainLayouut.tsx";
import {Outlet} from "react-router";

function AdminMainPage() {
    return (
        <BasicLayout>
            <Outlet></Outlet>
        </BasicLayout>
    );
}

export default AdminMainPage;