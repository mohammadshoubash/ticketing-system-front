import AuthLayout from "../../layouts/AuthLayout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Register() {
    const [Email, setEmail] = useState("");
    const [Name, setName] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    
    function handleName(e){
        Name = setName(e.target.value);
    }

    function handleEmail(e){
        Email = setEmail(e.target.value);
    }

    function handlePassword(e){
        Password = setPassword(e.target.value);
    }
    
    function handleConfirmPassword(e){
        ConfirmPassword = setConfirmPassword(e.target.value);
    }

    let responseJson = "";

    useEffect(function() {
        axios.get('http://localhost:8000/api/profile', {
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : '13|vtzAlsMtf0F5LplawQkggroUtUCfE8SDLqTBKpknb68e3d18'
            }
        }).then((res) => {
            responseJson = res
        })
    }, [])
    
    console.log(responseJson);

    const data = {
        name : Name,
        email : Email, 
        password : Password,
        password_confirmation : ConfirmPassword
    };

    const submitHandling = (e) => {
        e.preventDefault();
    };
    
    return <AuthLayout>
         <h1 className="mb-4 text-3xl font-bold">Register page</h1>
        
        <form onSubmit={submitHandling} action="">
            <div className="my-4">
                <label>Name</label>
                <input onChange={handleName} className="w-[330px]" type="text" placeholder="enter your name" />
            </div>
            
            <div className="my-4">
                <label>Email</label>
                <input onChange={handleEmail} className="w-[330px]" type="email" placeholder="enter your email" />
            </div>
            
            <div className="my-4">
                <label>Password</label>
                <input onChange={handlePassword} className="w-[330px]" type="password" placeholder="enter your password" />
            </div>

            <div className="my-4">
                <label>Confirm Password</label>
                <input onChange={handleConfirmPassword} className="w-[330px]" type="password" placeholder="confirm your password" />
            </div>

            <div className="my-4">
                <button type="submit" className="px-4 py-2 rounded-lg cursor-pointer primary-btn">Register</button>
            </div>
        </form>
    </AuthLayout>
}