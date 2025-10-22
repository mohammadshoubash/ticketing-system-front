import { useEffect, useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import AuthService from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function handleEmail(e){
        setEmail(e.target.value);
    }

    function handlePassword(e){
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        
        const response = await AuthService.login(email, password);
        if (response.token) {
            localStorage.setItem('auth-token', response.token.plainTextToken);
            localStorage.setItem('user', JSON.stringify(response.user));
            navigate('/');
        } else {
            setError(response.message || "Login failed");
        }
    };

    return <AuthLayout>
        <h1 className="mb-4 text-3xl font-bold">Login page</h1>

        {error && <div className="mb-4 text-red-500">{error}</div>}

        <form onSubmit={handleSubmit}>
            <div className="my-4">
                <label>Email</label>
                <input onChange={handleEmail} value={email} className="w-[330px]" type="email" placeholder="enter your email" required />
            </div>

            <div className="my-4">
                <label>Password</label>
                <input onChange={handlePassword} value={password} className="w-[330px]" type="password" placeholder="enter your password" required />
            </div>

            <div className="my-4">
                <button type="submit" className="px-4 py-2 rounded-lg cursor-pointer primary-btn" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </div>
        </form>
    </AuthLayout>
}
