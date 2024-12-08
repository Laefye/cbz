"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
const react_1 = __importDefault(require("react"));
const Telegram = __importStar(require("./Telegram"));
function App() {
    react_1.default.useEffect(() => {
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
    </div>;
}
