import BasicLayout from "../layouts/MainLayouut.tsx";
import AdminProductListPage from "./product/AdminProductListPage.tsx";

function AdminMainPage() {
    return (
        <BasicLayout>
            <div>
                <AdminProductListPage></AdminProductListPage>
            </div>
        </BasicLayout>
    );
}

export default AdminMainPage;