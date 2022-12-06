import { GlobalState } from "../../globalState";
import { samePath } from "../helpers/files";

export function checkSystemFilesCreationCommand(command) {
    const currentLocation = GlobalState.savedState.currentLocation;

    return currentLocation.length === 0 && command === "touch pierre-philosophale ordinateur-quantique";
}
export function checkFakeSystemRiddleFiles() {
    const tree = GlobalState.savedState.filesTree;

    const kilimandjaro = tree?.["mountains"]?.children?.["kilimandjaro"];
    const everest = tree?.["mountains"]?.children?.["everest"];


    const hasMountains = !!tree["mountains"];

    const isInAbri = !!tree["mountains"]?.children?.["abri"] && samePath(GlobalState.savedState.currentLocation, ["mountains", "abri"]);

    const hasKilimandjaro = !!kilimandjaro;
    const hasEverest = !!everest;

    const hasOnlyTwoMountains = Object.values(tree["mountains"]?.children || {}).length === 3; // +1 for the abri

    const kilimandjaroHasPierre = kilimandjaro?.children?.["pierre-philosophale"] && kilimandjaro?.children?.["pierre-philosophale"]?.isFile;
    const kilimandjaroHasOrdinateur = kilimandjaro?.children?.["ordinateur-quantique"] && kilimandjaro?.children?.["ordinateur-quantique"]?.isFile;

    const everestHasPierre = everest?.children?.["pierre-philosophale"] && everest?.children?.["pierre-philosophale"]?.isFile;
    const everestHasOrdinateur = everest?.children?.["ordinateur-quantique"] && everest?.children?.["ordinateur-quantique"]?.isFile;

    const dontHavePierreAndOrdinateurInRoot = !tree["pierre-philosophale"] && !tree["ordinateur-quantique"];

    return !!(hasMountains && isInAbri && hasKilimandjaro && hasEverest && hasOnlyTwoMountains && kilimandjaroHasPierre && kilimandjaroHasOrdinateur && everestHasPierre && everestHasOrdinateur && dontHavePierreAndOrdinateurInRoot);
}
