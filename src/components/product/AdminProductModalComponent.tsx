import {useRecoilValue} from 'recoil';
import modalState from "../../atoms/modalState.ts";
import AdminProductReadPage from "../../pages/product/AdminProductReadPage.tsx";
import AdminProductModifyComponent from "./AdminProductModifyComponent.tsx";

function AdminProductModalComponent() {

    const { isModify }  = useRecoilValue(modalState)

    return (
        <div className="modal">
            {isModify ? <AdminProductModifyComponent/> : <AdminProductReadPage/>}
        </div>
    );
}

export default AdminProductModalComponent;
