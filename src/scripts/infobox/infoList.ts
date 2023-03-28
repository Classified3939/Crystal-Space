import { InfoItem } from "./allInfo";

export class InfoList {
    id: string;
    infoShown: InfoItem[];
    newInfo: boolean;

    constructor(id: string) {
        this.id = id;
        this.infoShown = new Array<InfoItem>();
        this.newInfo = false;
    }

    addInfo(newInfo: InfoItem, isLoading: boolean = false) {
        if (this.infoShown.find(i => i.name === newInfo.name) !== undefined) return;
        this.infoShown.unshift(newInfo);
        if (!isLoading) {
            this.newInfo = true;
            window.setTimeout(() => this.newInfo = false, 1500);
        }
    }

    getInfo(): string[] {
        const infoArray = new Array<string>();
        for (const info of this.infoShown) {
            infoArray.unshift(info.display);
        }
        return infoArray;
    }

    load(toLoad: InfoItem[]) {
        this.infoShown = new Array<InfoItem>();
        for (const i of toLoad) {
            this.infoShown.push(i);
        }
    }
}