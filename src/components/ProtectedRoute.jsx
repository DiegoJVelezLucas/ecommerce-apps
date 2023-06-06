import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const tokenValue = localStorage.getItem("token")
    if (tokenValue) {
        return <Outlet/>
    } else {
        return <Navigate to= "/login"/>
    }
};

export default ProtectedRoute;