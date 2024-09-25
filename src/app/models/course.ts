export interface VimeoVideo {
    uri: string;
    name: string;
    duration: number;
    cover: string;
    html: string;
    created_time: string;
    modified_time: string;
    parentFolder: string | null;
}