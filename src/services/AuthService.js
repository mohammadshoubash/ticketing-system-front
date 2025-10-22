import axios from "axios"

const base_url = "http://127.0.0.1:8000/api";

const AuthService = {
    async login(email, password) {
        const response = await axios.post(base_url + '/login', {
            email: email,
            password: password
        });
        return response.data;
    },

    async register(name, email, password, password_confirmation) {
        const response = await axios.post(base_url + '/register', {
            name: name,
            email: email,
            password: password,
            password_confirmation: password_confirmation
        });
        return response.data;
    },

    async getProfile() {
        const token = localStorage.getItem('auth-token');
        const response = await axios.get(base_url + '/profile', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    },

    async logout() {
        const token = localStorage.getItem('auth-token');
        const response = await axios.post(base_url + '/logout', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    }
};

export default AuthService;
