import { ReactNode, useEffect } from "react";
import { hideBackButton, showBackButton } from "./Telegram";

export default function Backable({ children, onBack }: {children: ReactNode, onBack: () => void}) {
    useEffect(() => {
        showBackButton(onBack);
        return () => hideBackButton(onBack);
    }, [onBack]);
    return children;
}