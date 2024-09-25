export interface VimeoVideo {
    uri: string;
    name: string;
    duration: number;
    cover: string;
    html: string;
    createdAt: string;
    updatedAt: string;
    parentFolder: string | null;
}