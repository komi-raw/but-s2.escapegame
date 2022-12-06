export const COLORS = {
    WARNING: "orange",
    GOOD: "green",
    BAD: "red",
    NONE: "",
    TEXT: "#ffe37e"
}

export const STYLE = {
    BOLD: "b",
    UNDERLINE: "u",
    NONE: ""
}

export function format(text, style = STYLE.NONE, fontColor = COLORS.NONE, bgColor = COLORS.NONE) {
    return `[[${style};${fontColor};${bgColor}]${parseStyle(parseIcon(text, fontColor))}]`
}

export function parseStyle(str) {
    const underlineRegex = /_([^_]+)_/gim
    const boldRegex = /\*([^*]+)\*/gim

    const newStr = str.replaceAll(underlineRegex, (match, text) => {
        return `[[${STYLE.UNDERLINE};;]${text}]`
    })
    return newStr.replaceAll(boldRegex, (match, text) => {
        return `[[${STYLE.BOLD};;]${text}]`
    })
}

export function parseIcon(str, color = STYLE.NONE) {
    const iconNameRegex = /\{\{\s*([^|\s]+)\s*(?:\|\s*([^\s}]+)\s*)?\}\}/g
    return str.replaceAll(iconNameRegex, (match, iconName, iconColor) => {
        return `[[;${iconColor || color};;fa fa-${iconName};] ]`
    })
}

export function formatImage(link) {
    return `[[@;;;;${link}]]
    `
}