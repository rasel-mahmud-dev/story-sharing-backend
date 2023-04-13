interface PostType {
    _id?: string
    title: string
    authorId: string
    summary: string
    slug: string
    cover?: string
    path: string
    tags: string[]
    createdAt?: Date
    updatedAt?: Date
    htmlContent: string
}

export default PostType