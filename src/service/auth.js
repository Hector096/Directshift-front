import axios from "axios";
import authHeader from "./header";

const API_URL = "http://127.0.0.1:3000";

const register = (values, referral) =>
    axios.post(`${API_URL}/signup`, { user: values, referral });

const invite = async (email, referral) =>
    axios.post(
        `${API_URL}/user/invite`,
        { email, referral },
        { headers: authHeader() }
    );

const login = (email, password) =>
    axios
        .post(`${API_URL}/login`, {
            user: {
                email,
                password,
            },
        })
        .then((response) => {
            if (response.headers.authorization) {
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );
                localStorage.setItem(
                    "token",
                    JSON.stringify(response.headers.authorization)
                );
            }

            return response.data.user;
        });

const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
};

export default {
    register,
    login,
    logout,
    invite,
};
