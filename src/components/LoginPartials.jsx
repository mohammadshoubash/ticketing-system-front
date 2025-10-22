import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function LoginPartials() {
    const isAuthenticated = (localStorage.getItem('auth-token') == null);
    let navigate = useNavigate();

    const handleLogout = async (e) => {
        localStorage.removeItem('auth-token');
        window.location.assign('/');
    }

return <>
        {
            isAuthenticated ? 
        
            <div className="flex gap-2">
                <a href="/register" className="px-3 py-2 text-sm font-medium text-white rounded-md btn-active">Register</a>
                <a href="/login" className="px-4 py-2 text-sm font-medium rounded-lg">Login</a>
            </div> : 
            
            <div className="">
                <el-dropdown class="relative">
                    <button class="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500">
                        <span class="absolute -inset-1.5"></span>
                        <span class="sr-only">Open user menu</span>
                        <img src="src\assets\images\avatar-people-person-profile-user.svg" width={30} alt="" className="p-2 bg-green-500 rounded-full" />
                    </button>

                    <el-menu anchor="bottom end" popover class="w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline outline-black/5 transition transition-discrete [--anchor-gap:--spacing(2)] data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:outline-hidden">Your profile</a>
                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:outline-hidden">Settings</a>
                        <button onClick={handleLogout} class="block w-full cursor-pointer text-left px-4 py-2 text-sm text-red-700 focus:bg-red-100 focus:outline-hidden">Sign out</button>
                    </el-menu>
                </el-dropdown>
            </div>
        }
    </>
}