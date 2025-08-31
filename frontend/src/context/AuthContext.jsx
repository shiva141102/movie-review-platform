import React, { createContext, useState, useEffect } from 'react';
import API from '../api/api';


export const AuthContext = createContext();


export function AuthProvider({ children }) {
const [user, setUser] = useState(() => {
try {
const raw = localStorage.getItem('user');
return raw ? JSON.parse(raw) : null;
} catch (e) { return null; }
});


useEffect(() => {
// Optional: validate token on load
}, []);


const login = async (email, password) => {
const res = await API.post('/auth/login', { email, password });
localStorage.setItem('token', res.data.token);
localStorage.setItem('user', JSON.stringify(res.data.user));
setUser(res.data.user);
return res.data.user;
};


const register = async (username, email, password) => {
const res = await API.post('/auth/register', { username, email, password });
localStorage.setItem('token', res.data.token);
localStorage.setItem('user', JSON.stringify(res.data.user));
setUser(res.data.user);
return res.data.user;
};


const logout = () => {
localStorage.removeItem('token');
localStorage.removeItem('user');
setUser(null);
};


return (
<AuthContext.Provider value={{ user, login, register, logout, setUser }}>
{children}
</AuthContext.Provider>
);
}
