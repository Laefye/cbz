import React, { ReactNode } from "react";

export default function Button(props: {children: ReactNode, className?: string, disabled?: boolean}) {
    return <button className={"py-3 rounded bg-tg-button text-tg-button-text " + (props.className ?? '')} disabled={props.disabled}>{props.children}</button>
}
