import {io} from "socket.io-client/dist/socket.io";

const socket = io.connect("http://localhost:3000");
export default socket;
