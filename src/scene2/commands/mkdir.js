import { GlobalState } from "../../globalState";
import { getFilesTree, isValidFileName, addInFilesTree, createDirectory } from "../helpers/files"

export function mkdir(...directoryNames) {
    for (const directoryName of directoryNames) {
        if (!isValidFileName(directoryName)) {
            this.error("You need to enter a valid directory name and to be in the creation directory")
            return;
        }

        const filesTree = getFilesTree(GlobalState.savedState.currentLocation);

        if (filesTree[directoryName]) {
            this.error(`The directory ${directoryName} already exists`)
            return;
        }
        GlobalState.updateSavedState({
            filesTree: addInFilesTree(GlobalState.savedState.currentLocation, createDirectory(directoryName))
        });
    }
}