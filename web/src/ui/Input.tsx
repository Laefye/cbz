import React, { HTMLInputTypeAttribute, Ref } from "react";

export default function Input(props: {refInput: Ref<HTMLInputElement>, type?: HTMLInputTypeAttribute, className?: string, label: string, disabled?: boolean, id: string, maxLength?: number, placeholder?: string}) {
    return <div className={'flex flex-col ' + (props.className ?? '')}>
        <label htmlFor={props.id} className="text-sm text-tg-hint px-3 mb-1">{props.label}</label>
        <input ref={props.refInput} type={props.type} className="border border-tg-secondary-bg rounded py-2 px-3 outline-none bg-tg-bg placeholder:text-tg-hint" id={props.id} disabled={props.disabled} maxLength={props.maxLength} placeholder={props.placeholder}/>
    </div>
}
