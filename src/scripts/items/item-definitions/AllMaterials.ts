import { AbstractItem } from "../AbstractItem";
import { ItemType } from "../ItemType";

export enum MaterialName {
    Wood = "matWood",
    Stone = "matStone",
    Iron = "matIron",
    Steel = "matSteel",
}

export class AllMaterials {
    static materials: Record<MaterialName, AbstractItem> = {
        [MaterialName.Wood]: { type: ItemType.Material, id: MaterialName.Wood, display: "Wood" },
        [MaterialName.Stone]: { type: ItemType.Material, id: MaterialName.Stone, display: "Stone" },
        [MaterialName.Iron]: { type: ItemType.Material, id: MaterialName.Iron, display: "Iron" },
        [MaterialName.Steel]: { type: ItemType.Material, id: MaterialName.Steel, display: "Steel" },
    }
}