export function convertPlexyLocaleToFastlaneLocale(locale: string) {
    return locale.replace('-', '_').toLowerCase();
}
