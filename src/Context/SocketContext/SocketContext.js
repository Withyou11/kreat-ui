import { useRef, createContext } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

function SocketProvider({ children }) {
    const socket = io('https://kreat-socket.onrender.com');
    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}

export { SocketContext, SocketProvider };
