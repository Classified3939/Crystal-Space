import { ItemType } from "./ItemType";

export interface AbstractItem {
    type: ItemType;
    display: string;
    id: string;
}