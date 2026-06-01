export type CardColor = "red" | "blue" | "green" | "yellow" | "wild";
export type ActionCard = "skip" | "reverse" | "draw2" | "wild" | "wild_draw4";
export type CardValue = number | ActionCard;
export interface Card {
    id: string;
    color: CardColor;
    value: CardValue;
}
//# sourceMappingURL=card.d.ts.map