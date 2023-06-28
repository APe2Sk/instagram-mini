export interface PhotoAddEdit {
    albumId: number;
    title: string;
    url: string | ArrayBuffer | null;
    thumbnailUrl: string | ArrayBuffer | null;
}
