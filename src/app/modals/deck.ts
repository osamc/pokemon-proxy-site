import { Timestamp } from "firebase/firestore";

export class Deck {
    id?: string;
    list?: { [key: string]: number; } = {}
    public?: boolean;
    owner?: string;
    name?: string;
    desc?: string;
    created?: Timestamp;
}