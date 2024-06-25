export interface Data {
    condition: Condition;
    price: number;
    reference: string;
    withOriginalPackaging: boolean;
    withPapers: boolean;
}

export const enum Condition {
    NEW_WITH_TAGS,
    NEW_WITHOUT_TAGS,
    NEW_WITH_DEFECTS,
    PRE_OWNED
}

export const enum DeliveryScope {
    WATCH_ONLY,
    WATCH_WITH_ORIGINAL_PAPERS,
    WATCH_WITH_ORIGINAL_BOX,
    WATCH_WITH_ORIGINAL_BOX_AND_PAPERS
}