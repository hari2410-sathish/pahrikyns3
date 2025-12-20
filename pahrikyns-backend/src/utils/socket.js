import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // change to prod URL later

export default socket;
