export const locales = {
    en: {
        label: "English",
        dayjs: () => import('dayjs/locale/en'),
        flatpickr: null,
        i18n: () => import("./locales/en/translations.json"),
        flag: 'united-kingdom'
    },
    pt: {
        label: "Português",
        dayjs: () => import('dayjs/locale/pt'),
        flatpickr: null,
        i18n: () => import("./locales/pt/translations.json"),
        flag: 'brazil'
    },
}
