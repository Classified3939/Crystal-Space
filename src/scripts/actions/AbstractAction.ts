import { ActionType } from "./ActionType"

export interface AbstractAction {
    display: string;
    type: ActionType;
    baseTime: number;
    progress: number;
    doAction: () => void
}