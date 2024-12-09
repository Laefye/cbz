/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,ts,tsx}"],
        theme: {
            colors: {
                'tg-bg': 'var(--tg-theme-bg-color)',
                'tg-text': 'var(--tg-theme-text-color)',
                'tg-hint': 'var(--tg-theme-hint-color)', 
                'tg-secondary-bg': 'var(--tg-theme-secondary-bg-color)',
                'tg-button': 'var(--tg-theme-button-color)',
                'tg-section-bg': 'var(--tg-theme-section-bg-color)',
                'tg-section-header-text': 'var(--tg-theme-hint-color)',
                'tg-section-separator': 'var(--tg-theme-section-separator-color)',
                'tg-button-text': 'var(--tg-theme-button-text-color)',
                'tg-destructive': 'var(--tg-theme-destructive-text-color)',
            },
            extend: {
                height: {
                    'stable': 'var(--tg-viewport-stable-height)',
                }
            }
        },
    plugins: [],
}

