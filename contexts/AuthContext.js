import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "@env";

console.log(API_URL);

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStorageData = async () => {
            setLoading(true);
            try {
                const token = await AsyncStorage.getItem("@token");
                console.log("AsyncStorage Token", token);
                if (token) {
                    axios.defaults.headers.common[
                        "Authorization"
                    ] = `Bearer ${token}`;
                    try {
                        const response = await axios.get(
                            `${API_URL}/protected`
                        );
                        console.log("User data loaded:", response.data.user);
                        setUser(response.data.user);
                    } catch (apiError) {
                        console.error(
                            "Error fetching user data:",
                            apiError.response?.data || apiError.message
                        );
                        await AsyncStorage.removeItem("@token");
                    }
                } else {
                    console.log("No token found in storage");
                }
            } catch (storageError) {
                console.error("Error accessing storage:", storageError.message);
            } finally {
                setLoading(false);
            }
        };
        loadStorageData();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${API_URL}/login`, {
                email,
                password,
            });
            console.log("Login successful:", response.data);
            await AsyncStorage.setItem("@token", response.data.token);
            axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${response.data.token}`;

            const userResponse = await axios.get(`${API_URL}/protected`);
            console.log(
                "User data fetched after login:",
                userResponse.data.user
            );
            setUser(userResponse.data.user);
        } catch (error) {
            if (error.response) {
                console.log("Response data:", error.response.data);
                console.log("Response status:", error.response.status);
                console.log("Response headers:", error.response.headers);
            } else if (error.request) {
                console.log("No response received:", error.request);
            } else {
                console.error("Error message:", error.message);
            }
            console.error("Error details:", error);
            throw error;
        }
    };

    const logout = async () => {
        await AsyncStorage.removeItem("@token");
        setUser(null);
        delete axios.defaults.headers.common["Authorization"];
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
