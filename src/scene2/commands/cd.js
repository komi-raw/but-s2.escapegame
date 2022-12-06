import { GlobalState, nextStep } from "../../globalState";
import { getFilesTree, relativeToAbsolutePath, splitPath } from "../helpers/files";

export function cd(where = ".") {
    const newPath = relativeToAbsolutePath(splitPath(where));
    const newFilesTree = getFilesTree(newPath);

    if (!newFilesTree || newFilesTree.isFile) {
        this.error(`No such path ${where}`)
        return
    }

    if(newPath?.[0] === "network-info"){
        nextStep(60);
    }

    GlobalState.updateSavedState({ currentLocation: newPath });
}