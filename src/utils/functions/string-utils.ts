export function enumToLegibleHuman(str: string) {
    const cleanStr = str.replaceAll('_', ' ');
    return cleanStr[0].toUpperCase() + cleanStr.slice(1);
}
