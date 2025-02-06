import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function Layout(){
    return(
        <>
            <Navbar />
            <div className="container">
                <Outlet />
            </div>
        </>
    )
}

export default Layout