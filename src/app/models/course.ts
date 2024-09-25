export interface VimeoVideo {
    uri: string;
    name: string;
    duration: number;
    cover: string;
    created_time: string;
    modified_time: string;
    parent_folder: string | null;
}