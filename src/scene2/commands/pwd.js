import { GlobalState } from "../../globalState";
import { joinPath } from "../helpers/files";

export function pwd() {
    this.echo(joinPath(GlobalState.savedState.currentLocation));
}