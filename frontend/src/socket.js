import {io} from "socket.io-client"

export const initSocket=async()=>{
    const option={
        'force new connection':true,
        reconnectionAttempt:"infinity",
        timeout:10000,
        transports:["websocket"],
    }
    return io(import.meta.env.VITE_BACKEND_URL,option)
}