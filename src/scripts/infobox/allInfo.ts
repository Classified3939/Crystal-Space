export enum InfoType {
    Story,
    Hint,
    Error,
}

export enum StoryName {
    Welcome,
    FirstTrinket,
    ResearchAxe,
    ResearchStone,
    CrystalTrading,
}

export enum ErrorName {

}

export enum HintName {

}

export interface InfoItem {
    type: InfoType,
    name: StoryName | ErrorName | HintName,
    display: string,
}

export class AllInfo {
    static story: Record<StoryName | ErrorName | HintName, InfoItem> = {
        [StoryName.Welcome]: {
            type: InfoType.Story,
            name: StoryName.Welcome,
            display: "You are a young orphan in a small village, with nothing to your name but <b>10 coins</b> and a crude <b>wooden knife</b>. " +
                "Fortunately, the local craftsman agrees to give you some money if you <b>run his errands</b> in town. " +
                "He also teaches you to carve basic <b>wooden sculptures</b> that he thinks could <b>sell for a profit</b>… " +
                "you will have to <b>buy your own wood</b> though."
        },
        [StoryName.FirstTrinket]: {
            type: InfoType.Story,
            name: StoryName.FirstTrinket,
            display: "The old man was right, with a bit of creative marketing you were able to sell the trinket for more money " +
                "than it cost to make. Your knife isn't looking so good though, you probably have about <b>4 more uses</b>. Once it " +
                "breaks, you should <b>craft</b> and <b>equip</b> a new one. Might be a good idea to figure out <b>how to make an axe</b> too."
        },
        [StoryName.ResearchAxe]: {
            type: InfoType.Story,
            name: StoryName.ResearchAxe,
            display: "With some scrap wood and a bit of teaching from the old man, you learn how to <b>craft axes</b>. " +
                "When an axe is <b>equipped</b>, you will be able to chop your own wood. " +
                "You can also now <b>sell wood</b>, although due to the trading post taking a cut, it will <b>sell for less than it costs to buy</b>. " +
                "You start to wonder if you could make tools out of <b>stronger materials</b>"
        },
        [StoryName.ResearchStone]: {
            type: InfoType.Story,
            name: StoryName.ResearchStone,
            display: "After paying your cheapskate teacher, he gives you a book about how to <b>craft tools with stone</b>. " +
                "Stone costs more, but the tools made with it will <b>last longer</b>. " +
                "There are also notes scribbled in the margins about crafter-mages who infused their tools with <b>mana crystals</b>. " +
                "If only you could find some..."
        },
        [StoryName.CrystalTrading]: {
            type: InfoType.Story,
            name: StoryName.CrystalTrading,
            display: "You tear apart some stone, hoping to find crystals contained within, when your teacher stops you. " +
                "He explains that mana crystals are only sold to recognized crafters, as they are too rare to sell to just anyone. " +
                "He considers you for a moment, then gives you a slip that <b>allows you to purchase red crystals.</b>" +
                "Give him the materials, and he will teach you to make <b>energetic tools</b>."
        },
    }
}