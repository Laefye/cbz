"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ready = ready;
function ready() {
    Telegram.WebApp.ready();
    Telegram.WebApp.setBottomBarColor(Telegram.WebApp.themeParams.secondary_bg_color);
    Telegram.WebApp.setHeaderColor(Telegram.WebApp.themeParams.bg_color);
}
