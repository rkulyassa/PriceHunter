export interface WatchData {
    condition: WatchCondition;
    price: number;
    reference: string;
    withOriginalPackaging: boolean;
    withPapers: boolean;
}

export const enum WatchCondition {
    NEW_WITH_TAGS,
    NEW_WITHOUT_TAGS,
    NEW_WITH_DEFECTS,
    PRE_OWNED
}

export type WatchValuation = [min: number, average: number, max: number];