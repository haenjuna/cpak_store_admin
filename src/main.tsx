import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import adminRouter from "./routers/adminRouter.tsx";

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={adminRouter}></RouterProvider>
)
