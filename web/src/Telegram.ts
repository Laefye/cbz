declare var Telegram: any;

export function ready() {
    Telegram.WebApp.ready();
    Telegram.WebApp.setBottomBarColor(Telegram.WebApp.themeParams.secondary_bg_color);
    Telegram.WebApp.setHeaderColor(Telegram.WebApp.themeParams.bg_color);
}

export function initData(): string {
    return Telegram.WebApp.initData;
}
