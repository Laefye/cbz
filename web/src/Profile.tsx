import React, { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "./App"
import { UserInfo } from "./api/client";
import Backable from "./Backable";
import Transfer from "./Transfer";
import PageForm from "./ui/PageForm";
import Input from "./ui/Input";
import Button from "./ui/Button";

function Skeletion() {
    return <div className="w-screen h-stable bg-tg-secondary-bg text-tg-text overflow-y-auto">
        <div className="bg-tg-bg shadow flex flex-col rounded-b-lg mb-4">
            <div className="flex flex-col h-32 items-center justify-center">
                <span className="text-tg-hint">Общее Колличестов</span>
                <span className="text-3xl flex items-center"><div className="bg-tg-secondary-bg animate-pulse h-7 w-16 me-1 rounded"></div> АР</span>
            </div>
            <div className="flex justify-center">
                <div className="p-3 px-4 text-tg-hint w-28 animate-pulse">Перевести</div>
                <div className="p-3 px-4 text-tg-hint w-28 animate-pulse">Получить</div>
                <div className="p-3 px-4 text-tg-hint w-28 animate-pulse">Оплатить</div>
            </div>
        </div>
    </div>
}

export function AmountPage(props: {makeAccount: () => void, info: UserInfo, transfer: () => void}) {
    return <div className="w-screen h-stable bg-tg-secondary-bg text-tg-text overflow-y-auto">
            <div className="bg-tg-bg shadow flex flex-col rounded-b-lg mb-4">
                <div className="flex flex-col h-32 items-center justify-center">
                    <span className="text-tg-hint">Общее Колличестов</span>
                    <span className="text-3xl">{ props.info.accounts.filter(x => x.type == 'private').reduce((d, x) => d + x.balance, 0)} АР</span>
                </div>
                <div className="flex justify-center">
                    <button className="p-3 px-4 text-tg-button w-28" onClick={props.transfer}>Перевести</button>
                    <button className="p-3 px-4 text-tg-button w-28">Получить</button>
                    <button className="p-3 px-4 text-tg-button w-28">Оплатить</button>
                </div>
            </div>
            {/* <div className="mb-4">
                <div className="px-2 text-tg-section-header-text">Ваши Кредиты</div>
                <div className="bg-tg-section-bg shadow flex flex-col">
                    <div className="flex items-center p-2 py-4">
                        <span>На постройку</span>
                        <div className="mx-2 h-2 rounded bg-tg-secondary-bg overflow-hidden flex-grow">
                            <div className="h-full w-1/2 bg-tg-button"></div>
                        </div>
                        <span>16 АР / 32 АР</span>
                    </div>
                    <div className="h-px w-2/3 self-center bg-tg-section-separator last:hidden"></div>
                </div>
            </div> */}
            <div className="mb-4">
                <div className="px-2 text-tg-section-header-text">Ваши Счета</div>
                <div className="bg-tg-section-bg shadow flex flex-col">
                    {
                        props.info.accounts.filter(x => x.type == 'private').map(x => (
                            <>
                                <button key={x.id} className="flex items-center p-2 text-left">
                                    <div className="flex-grow flex flex-col">
                                        <span className="mb-1">{ x.name }</span>
                                        <span className="text-tg-hint">{ x.id }</span>
                                    </div>
                                    <span>{ x.balance } АР</span>
                                </button>
                                <div className="h-px w-2/3 self-center bg-tg-section-separator last:hidden"></div>
                            </>
                        ))
                    }
                    <button className="text-tg-button py-4" onClick={props.makeAccount}>Создать Счёт</button>
                </div>
            </div>
        </div>
}

function MakeAccount({onCreated}: {onCreated: () => void}) {
    let [state, setState] = useState<string | null>(null);
    let [error, setError] = useState<string | null>(null);
    let client = useContext(AuthContext);
    let name = useRef<HTMLInputElement | undefined>(undefined);

    async function makeAccount() {
        setError(null);
        if (name.current.value.length == 0) {
            setError('Имя необходимо');
            return;
        }
        setState('loading');
        try {
            await client.createAccount(name.current.value);
        } catch (e) {
            setState(null);
            setError('Неизвестная ошибка');
            return;
        }
        onCreated();
    }

    return <PageForm title="Создание Счета" loading={state == 'loading'}>
        <form className="flex flex-col" onSubmit={(e) => { e.preventDefault(); makeAccount();}}>
            <Input refInput={name} id="name" label="Имя Счета" disabled={state == 'loading'} maxLength={15} className="mb-3"/>
            { error && <p className="mb-3 text-tg-destructive">{error}</p>}
            <Button disabled={state == 'loading'}>Создать</Button>
        </form>
    </PageForm>
}

export default function Profile() {
    let client = useContext(AuthContext);
    let [info, setInfo] = useState<UserInfo | null>(null);
    let [page, setPage] = useState('main');
    function update() {
        setInfo(null);
        (async () => {
            let info = await client.getMyUserInfo();
            setInfo(info);
        })();
    }
    useEffect(() => {
        update();
    }, []);
    if (info == null) {
        return <Skeletion/>
    }
    switch (page) {
        case 'main':
            return <AmountPage makeAccount={() => setPage('makeAccount')} info={info} transfer={() => setPage('transfer')}/>
        case 'makeAccount':
            return <Backable onBack={() => setPage('main')}><MakeAccount onCreated={() => {setPage('main'); update();}}/></Backable>
        case 'transfer':
            return <Backable onBack={() => setPage('main')}><Transfer info={info} onTransfered={() => {setPage('main'); update();}}/></Backable>
    }
    return <></>
}