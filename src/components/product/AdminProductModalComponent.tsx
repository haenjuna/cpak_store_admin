import {useRecoilValue} from 'recoil';
import modalState from "../../atoms/modalState.ts";
import AdminProductReadPage from "../../pages/product/AdminProductReadPage.tsx";
import AdminProductModifyComponent from "./AdminProductModifyComponent.tsx";
import ModifySampleCode2 from "./ModifySampleCode2.tsx";

function AdminProductModalComponent() {

    const { isModify }  = useRecoilValue(modalState)


    return (
        <>
            {isModify
                // ? <AdminProductModifyComponent/>
                ? <ModifySampleCode2/>
                : <AdminProductReadPage/>

            }
        </>
    );
}

export default AdminProductModalComponent;
