export enum QuestionType {
    Input,
    Select,
    MultiSelect,
    Radio
}

export enum TestStatus {
    Draft = "Draft",
    Open = "Open",
    Complete = "Complete"
}

export enum MessagePosition {
    Start,
    End,
    Timed
}

export enum TestType {
    CardSort = "Card Sort",
    TreeTest = "Tree Test"
}

export class Card {
    public id: number;
    public label: string;
    public description?: string;
    public initialOrder: number;
}

export class TestMessage {
    public title: string;
    public content?: string;
    public position: MessagePosition;
}

export class SurveyQuestion {
    public type: QuestionType;
    public label: string;
    public description?: string;
    public options?: string[];
    public required?: boolean;
}

export class Test {
    public id: number;
    public title: string;
    public description?: string;
    public type: TestType;
    public status: TestStatus;
    public messages?: TestMessage[];
    public questions?: SurveyQuestion[];
}

export class CardSortTest extends Test {
    public cards: Card[];
    public groups?: string[];
}

export class CardGroup {
    public title: string;
    public cards?: Card[];
}

export class SurveyAnswer {
    public question: SurveyQuestion;
    public input?: string;
    public options?: string[];
}

export class CardSortResult {
    public test: CardSortTest;
    public groups?: CardGroup[];
    public surveyAnswers?: SurveyAnswer[];
    public start: Date;
    public end: Date;
}
