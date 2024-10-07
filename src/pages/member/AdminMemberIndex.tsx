import {Outlet} from "react-router-dom";
import BasicLayout from "../../layouts/MainLayouut.tsx";


function AdminMemberIndex() {
    return (
        <BasicLayout>
            <div>Admin Member Index Page</div>

            <div className='w-full'>
                <Outlet></Outlet>
            </div>
        </BasicLayout>
    );
}

export default AdminMemberIndex;