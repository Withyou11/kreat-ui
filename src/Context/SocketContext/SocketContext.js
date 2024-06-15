import { useRef, createContext } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

function SocketProvider({ children }) {
    const socket = io('http://localhost:3002');
    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}

export { SocketContext, SocketProvider };
