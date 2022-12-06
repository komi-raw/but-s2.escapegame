import { nextStep } from "../../globalState";
import { getFilesTree, relativeToAbsolutePath, splitPath } from "../helpers/files";
import { format, STYLE, COLORS } from "../helpers/formatEcho";

export async function cat(where = ".") {
    const filesTree = getFilesTree(relativeToAbsolutePath(splitPath(where)));

    const file = filesTree;
    if (!file || !file.isFile) {
        this.error("This is not a file");
    } else if (file.isFile && file.password != undefined) {
        this.set_mask("*")
        const passwordFile = await this.read("Enter password to read the file : ");
        this.set_mask(false);
        if (passwordFile == file.password) {
            this.echo(format(`Good password !`))
            this.echo(format(file.content, STYLE.NONE, COLORS.TEXT));
            if (file.name === "OSI") {
                nextStep(90);
            }
        } else {
            this.error("Wrong password !");
        }
    } else if (file.isFile) {
        if (file.name === "broken_mouse") {
            nextStep(30);
        }
        this.echo(format(file.content, STYLE.NONE, COLORS.TEXT));
    }
}