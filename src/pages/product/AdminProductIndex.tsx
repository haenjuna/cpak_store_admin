import {Outlet} from "react-router-dom";
import BasicLayout from "../../layouts/MainLayouut.tsx";

function AdminProductIndex() {
    return (
        <BasicLayout>
            <div>Admin Product Index Page</div>

            <div className='w-full'>
                <Outlet></Outlet>
            </div>
        </BasicLayout>
    );
}

export default AdminProductIndex;