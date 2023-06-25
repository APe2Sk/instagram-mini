import { PhotoAction } from "../instagram-manager/enums/photo-action-enum";
import { PhotoPostInterface } from "./photo-posts-interface";

export interface DialogActionResult {
    action: PhotoAction;
    actionedPhoto: PhotoPostInterface;
}

