import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
    return (
        <div className='w-full mx-auto'>
             <div className="app-container flex flex-col min-h-screen "> 
            <Navbar />
            <div className="content flex-grow"> 
                <Outlet />
            </div>
            <Footer />
        </div>
        </div>
    );
};

export default MainLayout;