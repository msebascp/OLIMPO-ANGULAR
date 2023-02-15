import { Blog } from "./blog";

export interface DataBlogs {
    data: Blog[];
    message: string;
    success: boolean;
}