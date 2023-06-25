import { UserInterface } from "./user-interface";

export interface AlbumExtendedInterface {
    id: number;
    title: string;
    userId: number;
    user: UserInterface;
}

