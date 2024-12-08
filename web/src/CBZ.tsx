import React, { Component, createContext, ReactNode, useContext, useState } from "react";
import { Client } from "./api/client";

type State = {
    client: Client | null;
}

const MyContext = createContext<[State, React.Dispatch<React.SetStateAction<State>>]>(undefined);

export function CBZ({ children }: { children: ReactNode }) {
    let state = useState<State>({ client: null });
    return <MyContext.Provider value={state}>{children}</MyContext.Provider>
}

export function useClient() {
    return useContext(MyContext)[0].client;
}

export async function tryLogin() {
    let [state, setState] = useContext(MyContext);

}
