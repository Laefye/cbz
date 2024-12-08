import React from "react"
import * as Telegram from "./Telegram";

export default function App() {
    React.useEffect(() => {
        Telegram.ready();
    });

    return <div className="w-screen h-stable bg-tg-secondary-bg text-tg-text overflow-y-auto">
        <div className="bg-tg-bg shadow flex flex-col rounded-b-lg mb-4">
            <div className="flex flex-col h-32 items-center justify-center">
                <span className="text-tg-hint">Общее Колличестов</span>
                <span className="text-3xl">32 АР</span>
            </div>
            <div className="flex justify-center">
                <button className="p-3 px-4 text-tg-button w-28">Перевести</button>
                <button className="p-3 px-4 text-tg-button w-28">Получить</button>
                <button className="p-3 px-4 text-tg-button w-28">Оплатить</button>
            </div>
        </div>
        <div className="mb-4">
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
        </div>
        <div className="mb-4">
            <div className="px-2 text-tg-section-header-text">Ваши Счета</div>
            <div className="bg-tg-section-bg shadow flex flex-col">
                <div className="flex items-center p-2">
                    <div className="flex-grow flex flex-col">
                        <span className="mb-1">Счет Клан</span>
                        <span className="text-tg-hint">1234-5678</span>
                    </div>
                    <span>16 АР</span>
                </div>
                <div className="h-px w-2/3 self-center bg-tg-section-separator last:hidden"></div>
                <div className="flex items-center p-2">
                    <div className="flex-grow flex flex-col">
                        <span className="mb-1">Магазин</span>
                        <span className="text-tg-hint">1234-5678</span>
                    </div>
                    <span>16 АР</span>
                </div>
                <div className="h-px w-2/3 self-center bg-tg-section-separator last:hidden"></div>
                <div className="flex items-center p-2">
                    <div className="flex-grow flex flex-col">
                        <span className="mb-1">Казна</span>
                        <span className="text-tg-hint">1234-5678</span>
                    </div>
                    <span>0 АР</span>
                </div>
                <div className="h-px w-2/3 self-center bg-tg-section-separator last:hidden"></div>
            </div>
        </div>
        <div className="mb-4">
            <div className="px-2 text-tg-section-header-text">Доступные Счета</div>
            <div className="bg-tg-section-bg shadow flex flex-col">
                <div className="flex items-center p-2">
                    <div className="flex-grow flex flex-col">
                        <span className="mb-1">Мега Счёт</span>
                        <span className="text-tg-hint">1234-5678</span>
                    </div>
                    <span>128 АР</span>
                </div>
                <div className="h-px w-2/3 self-center bg-tg-section-separator last:hidden"></div>
            </div>
        </div>
    </div>
}