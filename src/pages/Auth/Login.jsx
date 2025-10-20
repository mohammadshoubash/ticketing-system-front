import { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";

export default function Login() {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    
    function handleEmail(e){
        Email = setEmail(e.target.value);
    }

    function handlePassword(e){
        Password = setPassword(e.target.value);
    }
    
    return <AuthLayout>
        <h1 className="mb-4 text-3xl font-bold">Login page</h1>
        
        <form action="">
            <div className="my-4">
                <label>Email</label>
                <input onChange={handleEmail} className="w-[330px]" type="email" placeholder="enter your email" />
            </div>
            
            <div className="my-4">
                <label>Password</label>
                <input onChange={handlePassword} className="w-[330px]" type="password" placeholder="enter your password" />
            </div>

            <div className="my-4">
                <button type="submit" className="px-4 py-2 rounded-lg cursor-pointer primary-btn">Login</button>
            </div>
        </form>
    </AuthLayout>
}