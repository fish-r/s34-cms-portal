export const NAME = "S34 CMS";

export interface MultipleChoice {
    question: string;
    options: Array<{option: string; value: string; }>
    answer?: string;
}