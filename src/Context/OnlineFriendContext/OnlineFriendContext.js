import { useState, createContext } from 'react';
const OnlineFriendContext = createContext();

function OnlineFriendProvider({ children }) {
    const [onlineFriendList, setOnlineFriendList] = useState([]);
    const value = {
        onlineFriendList,
        setOnlineFriendList,
    };
    return <OnlineFriendContext.Provider value={value}>{children}</OnlineFriendContext.Provider>;
}

export { OnlineFriendContext, OnlineFriendProvider };
