import React, { ReactNode } from "react"
import Page from "./Page"

export default function PageForm(props: {className?: string, children: ReactNode, title: string, loading: boolean}) {
    return <Page className={"pt-6 " + (props.className ?? "")}>
        <p className="text-center mb-4 text-xl">{props.title}</p>
        <div className={"bg-tg-section-bg shadow py-4 px-2 mx-4 rounded-lg " + (props.loading && 'animate-pulse')} >
            {props.children}
        </div>
    </Page>
}