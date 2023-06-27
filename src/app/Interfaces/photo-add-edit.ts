export interface PhotoAddEdit {
    albumId: number;
    // id: number;
    title: string;
    url: string | ArrayBuffer | null;
    thumbnailUrl: string | ArrayBuffer | null;
}
