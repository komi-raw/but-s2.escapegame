import { format, COLORS, STYLE } from '../helpers/formatEcho';
import { getFilesTree, relativeToAbsolutePath, splitPath } from '../helpers/files';

export function ls(folderName = ".") {
    const filesTree = getFilesTree(relativeToAbsolutePath(splitPath(folderName)));
    if (!filesTree) {
        this.error("This is not a valid path");
        return;
    }

    Object.values(filesTree).forEach(file => {
        const icon = file.isFile ? "{{ file | white }}" : "{{ folder }}";
        if(file.rights){
            this.echo(format(icon + " " + file.rights + " " + file.name, STYLE.NONE, COLORS.NONE, COLORS.NONE));
        }else{
            this.echo(format(icon + " " + file.name, STYLE.NONE, COLORS.NONE, COLORS.NONE));
        }
    })
}