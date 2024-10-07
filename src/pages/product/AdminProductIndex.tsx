import {Outlet} from "react-router-dom";
import BasicLayout from "../../layouts/MainLayouut.tsx";

function AdminProductIndex() {
    return (
        <BasicLayout>
            <div className='w-full'>
                <Outlet></Outlet>
            </div>
        </BasicLayout>
    );
}

export default AdminProductIndex;