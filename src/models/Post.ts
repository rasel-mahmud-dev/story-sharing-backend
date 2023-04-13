import {IndexType} from "../services/mongodb/models.index.types";
import Base from "./Base";

import PostType from "../interfaces/PostType";


class Post extends Base implements PostType {

    public _id?: string;
    public title: string;
    public authorId: string;
    public summary: string;
    public slug: string;
    public cover?: string;
    public path: string;
    public tags: string[];
    public createdAt?: Date = new Date();
    public updatedAt?: Date = new Date();
    public htmlContent: string;


    static indexes: IndexType = {
        title: {
            unique: true,
        },
        slug: {
            unique: true,
        },
        authorId: {}
    }

    static collectionName = "posts"

    constructor(data: Post) {
        super(Post.collectionName);
        this.title = data.title
        this.authorId = data.authorId
        this.summary = data.summary
        this.slug = data.slug
        this.cover = data.cover
        this.path = data.path
        this.tags = data.tags
        this.htmlContent = data.htmlContent
    }


}


module.exports = Post
export default Post




