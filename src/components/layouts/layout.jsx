import Navbar from '../navBar/navBar'
import { Outlet } from 'react-router-dom'

function Layout() {
    return (
        <>
            <Navbar />
            <div className='flex h-[calc(100vh-64px)] w-full items-center justify-center'>
                <Outlet />
            </div>
        </>
    );
}

export default Layout;