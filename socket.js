import {io} from "socket.io-client/dist/socket.io";

const socket = io.connect("https://twitch-shares-backend.onrender.com");
export default socket;
