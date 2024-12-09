declare var Telegram: any;

export function ready() {
    Telegram.WebApp.ready();
    Telegram.WebApp.BackButton.hide();
    Telegram.WebApp.setBottomBarColor(Telegram.WebApp.themeParams.secondary_bg_color);
    Telegram.WebApp.setHeaderColor(Telegram.WebApp.themeParams.bg_color);
}

export function initData(): string {
    return Telegram.WebApp.initData;
}

export function showBackButton(onClick: () => void) {
    Telegram.WebApp.BackButton.show();
    Telegram.WebApp.BackButton.onClick(onClick);
}

export function hideBackButton(onClick: () => void) {
    Telegram.WebApp.BackButton.offClick(onClick);
    Telegram.WebApp.BackButton.hide();
}
