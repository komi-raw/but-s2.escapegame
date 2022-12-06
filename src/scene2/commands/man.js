import mansContent from "../helpers/mansContent";
import { COLORS, format, STYLE } from "./../helpers/formatEcho"

export function man(name = "?") {
    name = name.toLowerCase();
    if (mansContent[name]) {
        this.echo(format(mansContent[name](), STYLE.NONE, COLORS.TEXT))
    } else {
        this.error(`There is no man page for ${name}`)
    }
}