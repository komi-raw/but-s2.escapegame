import { GlobalState } from "../../globalState";
import { getFilesTree, isValidFileName, removeInFilesTree } from "../helpers/files";

export function rm(...filesNames) {
    for (const fileName of filesNames) {
        if (!isValidFileName(fileName)) {
            this.error("You need to enter a valid filename and to be in the removing directory")
            return;
        }

        const filesTree = getFilesTree(GlobalState.savedState.currentLocation);

        if (!filesTree[fileName]) {
            this.error(`The file ${fileName} doesn't exist`)
            return;
        }
        if (!filesTree[fileName].isFile) {
            this.error(`${fileName} is not a file`)
            return;
        }

        GlobalState.updateSavedState({
            filesTree: removeInFilesTree(GlobalState.savedState.currentLocation, fileName)
        });

    }
}