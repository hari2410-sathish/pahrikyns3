import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Only connect if we have a token (Admin or User)
        const userToken = localStorage.getItem("USER_TOKEN");
        const adminToken = localStorage.getItem("ADMIN_TOKEN");
        const token = adminToken || userToken; // Prioritize Admin if both exist (rare) or just use whatever is found.

        if (!token) {
            console.log("⚠️ Socket: No token found, skipping connection");
            return;
        }

        // Connect to the backend
        const newSocket = io("http://localhost:5000", {
            auth: { token }, // Send the found token
            withCredentials: true,
            transports: ["websocket", "polling"],
        });

        setSocket(newSocket);

        // Logging connection status for debugging
        newSocket.on("connect", () => {
            console.log("✅ Socket Connected:", newSocket.id);
        });

        newSocket.on("disconnect", () => {
            console.log("❌ Socket Disconnected");
        });

        newSocket.on("connect_error", (err) => {
            console.error("⚠️ Socket Connection Error:", err.message);
        });

        return () => {
            newSocket.disconnect();
        };
    }, []); // Note: real-world apps might want to listen to token changes explicitly or via Context.

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
