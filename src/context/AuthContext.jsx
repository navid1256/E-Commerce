import { useContext, useState } from "react";
import { AuthContext } from "../AuthContex";

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(localStorage.getItem("currentUserEmail")
        ? { email: localStorage.getItem("currentUserEmail") }
        : null
    );

    function signUp(email, password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];

        if (users.find(user => user.email === email)) {
            return { success: false, message: 'User already exists' };
        }
        const newUser = { email, password };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUserEmail", email);

        setUser({ email });
        return { success: true };
    }

    function login(email, password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
            localStorage.setItem("currentUserEmail", email);
            setUser({ email });
            return { success: true };
        } else {
            return { success: false, message: 'Invalid email or password' };
        }
    }

    function logout() {
        localStorage.removeItem("currentUserEmail");
        setUser(null);
    }
    return (
        <AuthContext.Provider value={{ signUp, login, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}