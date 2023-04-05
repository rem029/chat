import io from "socket.io-client";
import { URL_BASE } from "./constant";

const socket = io(URL_BASE);

export default socket;
