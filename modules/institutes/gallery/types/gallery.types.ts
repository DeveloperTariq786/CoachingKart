export interface GalleryItem {
    id: string;
    image: string;
    tag: string;
    createdAt: string;
}

export interface GalleryResponse {
    success: boolean;
    message: string;
    data: GalleryItem[];
}
