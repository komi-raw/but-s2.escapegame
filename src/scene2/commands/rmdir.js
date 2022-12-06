import { GlobalState } from "../../globalState";
import { getFilesTree, isValidFileName, removeInFilesTree } from "../helpers/files";

export function rmdir(...directoryNames) {
    for (const directoryName of directoryNames) {
        if (!isValidFileName(directoryName)) {
            this.error("You need to enter a valid directory name and to be in the removing directory")
            return;
        }

        const filesTree = getFilesTree(GlobalState.savedState.currentLocation);

        if (!filesTree[directoryName]) {
            this.error(`The directory ${directoryName} doesn't exist`)
            return;
        }
        if (filesTree[directoryName].isFile) {
            this.error(`${directoryName} is not a directory`)
            return;
        }

        GlobalState.updateSavedState({
            filesTree: removeInFilesTree(GlobalState.savedState.currentLocation, directoryName)
        });
    }
}