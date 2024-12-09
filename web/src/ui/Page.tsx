import React, { ReactNode } from "react"

export default function Page(props: {className?: string, children: ReactNode}) {
    return <div className={"w-screen h-stable bg-tg-secondary-bg text-tg-text overflow-y-auto " + (props.className ?? "")}>
        {props.children}
    </div>
}