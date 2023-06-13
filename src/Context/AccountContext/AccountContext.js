import { useState, createContext } from 'react';
const AccountContext = createContext();

function AccountProvider({ children }) {
    const [accountId, setAccountId] = useState('');
    const value = {
        accountId,
        setAccountId,
    };
    return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}

export { AccountContext, AccountProvider };
