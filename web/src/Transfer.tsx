import React, { useContext, useRef, useState } from "react";
import PageForm from "./ui/PageForm";
import { MakingTransferException, UserInfo } from "./api/client";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { AuthContext } from "./App";

export default function Transfer({info, onTransfered}: {info: UserInfo, onTransfered: () => void}) {
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState<string | null>(null);
    let from = useRef<HTMLSelectElement | undefined>(undefined);
    let to = useRef<HTMLInputElement | undefined>(undefined);
    let amount = useRef<HTMLInputElement | undefined>(undefined);
    let client = useContext(AuthContext);
    async function makePayment() {
        setError(null);
        if (to.current.value.length != 14) {
            return setError('Получатель необходим');
        }
        if (amount.current.value.length == 0 || amount.current.valueAsNumber <= 0) {
            return setError('Сумма должна быть положительная');
        }
        try {
            let transaction = await client.makeTransfer(from.current.value, to.current.value, amount.current.valueAsNumber);
        } catch (e) {
            if (e instanceof MakingTransferException) {
                if (e.message == 'Not found receiver account') {
                    setError('Не найден счёт получателя');
                }
            } else {
                setError('Неизвестная ошибка');
            }
            return;
        }
        onTransfered();
    }
    return <PageForm title="Перевод" loading={loading}>
        <form className="flex flex-col" onSubmit={(e) => {e.preventDefault(); makePayment();}}>
            <label htmlFor="from">Откуда</label>
            <select disabled={loading} ref={from} id="from" className="bg-tg-bg border border-tg-secondary-bg rounded p-2 mb-3">
                { info.accounts.map(x => (<option key={x.id} value={x.id}>{x.name} ({x.balance} АР)</option>))}
            </select>
            <Input disabled={loading} label="Куда" id="to" refInput={to} className="mb-3" placeholder="1234-5678-1234" maxLength={14}/>
            <Input disabled={loading} label="Сколько" id="amount" refInput={amount} className="mb-3" type="number"/>
            { error && <p className="mb-3 text-tg-destructive">{error}</p>}
            <Button disabled={loading}>Перевести</Button>
        </form>
    </PageForm>
}