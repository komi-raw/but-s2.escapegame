import { GlobalState } from "../../globalState";
import { getFilesTree, isValidFileName, addInFilesTree, createFile } from "../helpers/files"


export function touch(...filesNames) {
    for (const fileName of filesNames) {
        if (!isValidFileName(fileName)) {
            this.error("You need to enter a valid filename and to be in the creation directory");
            return;
        }

        const filesTree = getFilesTree(GlobalState.savedState.currentLocation);

        if (filesTree[fileName]) {
            this.error(`The file ${fileName} already exists`)
            return;
        }
        GlobalState.updateSavedState({
            filesTree: addInFilesTree(GlobalState.savedState.currentLocation, createFile(fileName, ""))
        });
    }
}