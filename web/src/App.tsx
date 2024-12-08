import React, { createContext, useState } from "react"
import * as Telegram from "./Telegram";
import { Client, login, UserState } from "./api/client";
import Profile from "./Profile";

function Loading() {
    return <div className="w-screen h-stable bg-tg-secondary-bg text-tg-text flex flex-col items-center justify-center">
        <div className="w-10 h-10 bg-tg-bg rounded animate-spin"></div>
    </div>
}

function UnactiveAccount() {
    return <div className="w-screen h-stable bg-tg-secondary-bg text-tg-text flex flex-col justify-center">
        <div className="bg-tg-section-bg shadow py-4 px-2">
            <p>Ваш аккаунт не активен</p>
        </div>
    </div>
}

export const AuthContext = createContext<Client>(undefined);

export default function App() {
    let [client, setClient] = useState<Client | null>(null);
    let [state, setState] = useState<UserState | null>(null);
    React.useEffect(() => {
        Telegram.ready();
        (async () => {
            let client = await login(Telegram.initData());
            setClient(client);
            let state = await client.getMyState();
            setState(state);
        })();
    }, []);
    return <>
        {
            state == null ? <Loading/> : <>{state == 'active' ? <AuthContext value={client}><Profile/></AuthContext> : <UnactiveAccount/> }</>
        }
    </>;
}