export function parseIconToHtml(text) {
    const iconNameRegex = /\{\{\s*([^|\s]+)\s*(?:\|\s*([^\s}]+)\s*)?\}\}/g

    return text.replaceAll(iconNameRegex, (match, iconName, iconColor) => {
        return `<span style="color: ${iconColor};" class="fa fa-${iconName}"></span>`
    })
}