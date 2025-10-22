import AuthLayout from "../../layouts/AuthLayout";
import { useState } from "react";
import AuthService from "../../services/AuthService";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    function handleName(e){
        setName(e.target.value);
    }

    function handleEmail(e){
        setEmail(e.target.value);
    }

    function handlePassword(e){
        setPassword(e.target.value);
    }

    function handleConfirmPassword(e){
        setConfirmPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const response = await AuthService.register(name, email, password, confirmPassword);

            if (response.user) {
                setSuccess("Registration successful! You can now log in.");
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setError(response.message || "Registration failed");
            }
        } catch (err) {
            if (err.response?.data?.errors) {
                const errors = err.response.data.errors;
                const errorMessages = Object.values(errors).flat().join(', ');
                setError(errorMessages);
            } else {
                setError(err.response?.data?.message || "Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };

    return <AuthLayout>
        <h1 className="mb-4 text-3xl font-bold">Register page</h1>

        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}

        <form onSubmit={handleSubmit}>
            <div className="my-4">
                <label>Name</label>
                <input onChange={handleName} value={name} className="w-[330px]" type="text" placeholder="enter your name" required />
            </div>

            <div className="my-4">
                <label>Email</label>
                <input onChange={handleEmail} value={email} className="w-[330px]" type="email" placeholder="enter your email" required />
            </div>

            <div className="my-4">
                <label>Password</label>
                <input onChange={handlePassword} value={password} className="w-[330px]" type="password" placeholder="enter your password" required />
            </div>

            <div className="my-4">
                <label>Confirm Password</label>
                <input onChange={handleConfirmPassword} value={confirmPassword} className="w-[330px]" type="password" placeholder="confirm your password" required />
            </div>

            <div className="my-4">
                <button type="submit" className="px-4 py-2 rounded-lg cursor-pointer primary-btn" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
            </div>
        </form>
    </AuthLayout>
}
