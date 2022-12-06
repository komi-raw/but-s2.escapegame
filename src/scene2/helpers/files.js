import { GlobalState } from "../../globalState";

/**
 * 
 * @param {string[]} path 
 * @returns the files tree for the given file path
 */
export function getFilesTree(path = [], startFilesTree) {
    let filesTree = startFilesTree || GlobalState.savedState.filesTree;

    for (const fileName of path) {
        const file = filesTree?.[fileName];

        if (file?.children) {
            filesTree = file.children;
        } else {
            filesTree = file;
        }
    }

    return filesTree;
}

export function getFilesTreeCopy(path = [], filesTree = GlobalState.savedState.filesTree) {
    let filesTreeCopy = structuredClone(filesTree);

    for (const fileName of path) {
        const file = filesTreeCopy?.[fileName];

        if (file?.children) {
            filesTreeCopy = file.children;
        } else {
            filesTreeCopy = file;
        }
    }

    return filesTreeCopy;
}

export function addInFilesTree(elementPath, elementName) {
    const filesTreeCopy = getFilesTreeCopy();

    const elementTree = getFilesTree(elementPath, filesTreeCopy);
    elementTree[elementName.name] = elementName;

    return filesTreeCopy;
}

export function removeInFilesTree(elementPath, elementName) {
    const filesTreeCopy = getFilesTreeCopy();

    const elementTree = getFilesTree(elementPath, filesTreeCopy);
    delete elementTree[elementName];

    return filesTreeCopy;
}

export function moveInFilesTree(elementPath, elementName, destinationDirectory) {
    const filesTreeCopy = getFilesTreeCopy();

    const destinationFilesTree = getFilesTree(destinationDirectory, filesTreeCopy);
    const elementTree = getFilesTree(elementPath, filesTreeCopy);

    const elementToMove = elementTree[elementName];
    delete elementTree[elementName];

    destinationFilesTree[elementName] = elementToMove;

    return filesTreeCopy;
}

export function copyInFilesTree(elementPath, elementName, destinationDirectory) {
    const filesTreeCopy = getFilesTreeCopy();

    const destinationFilesTree = getFilesTree(destinationDirectory, filesTreeCopy);
    const elementTree = getFilesTree(elementPath, filesTreeCopy);

    const elementToCopy = structuredClone(elementTree[elementName]);

    destinationFilesTree[elementName] = elementToCopy;

    return filesTreeCopy;
}
export function isValidFileName(fileName) {
    if (!fileName) return false;
    if (fileName.includes("/") || fileName.includes("\\") || fileName.includes("..") || fileName === "." || fileName.includes("*")) return false;
    return true;
}

export function splitPath(strPath) {
    if (strPath === "/") {
        return null;
    }
    return strPath.split("/");
}

export function joinPath(path) {
    return `/${path.join("/")}`
}

export function createFile(name, content) {
    return { isFile: true, name: name, content: content };
}

export function createFileWithRights(rights, name, password, content) {
    return { isFile: true, name: name, rights: rights, password: password, content: content }
}

export function createDirectory(name) {
    return { isFile: false, name: name, children: {} };
}

export function samePath(path1, path2) {
    return JSON.stringify(path1) == JSON.stringify(path2);
}

export function relativeToAbsolutePath(path) {
    const currentLocation = GlobalState.savedState.currentLocation;
    let newPath = currentLocation;

    if (path === null) {
        return [];
    }
    path.forEach(subPath => {
        if (subPath === "..") {
            newPath = newPath.slice(0, -1)
        } else if (subPath === ".") {
            // do nothing
        } else if (subPath) {
            newPath = [...newPath, subPath];
        }
    });

    return newPath;
}

