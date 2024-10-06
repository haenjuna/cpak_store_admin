import {useRecoilValue} from 'recoil';
import modalState from "../../atoms/modalState.ts";
import AdminProductReadPage from "../../pages/product/AdminProductReadPage.tsx";
import AdminProductModifyComponent from "./AdminProductModifyComponent.tsx";

function AdminProductModalComponent() {

    const { isModify }  = useRecoilValue(modalState)

    console.log(isModify)

    return (
        <div>
            {isModify
                ? <AdminProductModifyComponent/>
                : <AdminProductReadPage/>
            }
        </div>
    );
}

export default AdminProductModalComponent;
