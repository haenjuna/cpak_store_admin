import BasicLayout from "../layouts/MainLayouut.tsx";
import {Outlet} from "react-router";

function AdminMainPage() {
    return (
        <BasicLayout>
            <div>
                <Outlet></Outlet>
            </div>
        </BasicLayout>
    );
}

export default AdminMainPage;