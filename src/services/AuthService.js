import axios from "axios"

const base_url = "http://localhost:8000/api";

axios.post(base_url + '/login', {
    email : "mohammad@gmail.com",
    password : "12341234"
}).then(res => console.log(res));

axios.post(base_url + '/register', {
    email : "ahmad@gmail.com",
    name : "ahmad",
    password : "12341234",
    password_confirmation : "12341234"
}).then(res => console.log(res));

axios.get(base_url + '/profile');