import response from "../response";
import errorConsole from "../logger/errorConsole";
import slugify from "slugify";
import {ObjectId} from "mongodb";
import * as mongodb from "mongodb";
import path from "path";
import {rm} from "fs/promises";

const Readable = require('stream').Readable;


import saveLog from "../logger/saveLog";
import * as mongoose from "mongoose";
import {Request, Response} from "express";


import User from "../models/User"

import Post from "../models/Post"


// const Hits = mongoose.model("Hits")


const shortid = require("shortid")

export const getP = (req: Request, res: Response) => {
    try {
        res.send("test")
    } catch (ex) {
        res.send("test err")
    } finally {

    }
}

export const getPosts = async (req: Request, res: Response) => {

    const {authorId, slug = ""} = req.query


    try {


        if (slug) {

            let posts: any = []

            posts = await Post.aggregate([
                // @ts-ignore
                {$match: {slug: slug}},
                {
                    $lookup: {
                        from: "users",
                        localField: "authorId",
                        foreignField: "_id",
                        as: "author"
                    }
                },
                {$unwind: {path: "$author", preserveNullAndEmptyArrays: true}},
                // {
                //     $lookup: {
                //         from: "hits",
                //         localField: "_id",
                //         foreignField: "postId",
                //         as: "hits"
                //     }
                // },
                // {$unwind: {path: "$hits", preserveNullAndEmptyArrays: true}},
                // {
                //     $lookup: {
                //         from: "likes",
                //         localField: "_id",
                //         foreignField: "post_id",
                //         as: "like"
                //     }
                // },
                // {$unwind: {path: "$like", preserveNullAndEmptyArrays: true}},
                {$project: {htmlContent: 0}}
            ])

            res.json({post: posts[0]})

        } else if (authorId) {
            let posts = await Post.aggregate([
                // @ts-ignore
                {$match: authorId ? {authorId: new ObjectId(authorId)} : {}},
                {
                    $lookup: {
                        from: "users",
                        localField: "authorId",
                        foreignField: "_id",
                        as: "author"
                    }
                },
                {$unwind: {path: "$author", preserveNullAndEmptyArrays: true}},
                {$project: {content: 0, author: {password: 0, created_at: 0, updated_at: 0, description: 0}}}
            ])

            res.json({posts: posts})
        } else{
            let posts = await Post.aggregate([
                {
                    $lookup: {
                        from: "users",
                        localField: "authorId",
                        foreignField: "_id",
                        as: "author"
                    }
                },
                {$unwind: {path: "$author", preserveNullAndEmptyArrays: true}},
                {$project: {content: 0, author: {password: 0, created_at: 0, updated_at: 0, description: 0}}}
            ])

            res.json({posts: posts})
        }


    } catch (ex) {
        res.send(ex.message)
    } finally {

    }
}

export const filterPosts = async (req: Request, res: Response) => {
    const {filter}: {
        filter: { tags?: string[], text?: string, summary?: string }
    } = req.body

    try {

        let regExp = new RegExp(filter.text, "i")

        let posts = await Post.aggregate([
            {
                $match: {
                    // @ts-ignore
                    $or: [
                        {title: {$in: [regExp]}},
                        {summary: {$in: [regExp]}},
                        {tags: filter.tags ? {$in: filter.tags} : []}
                    ]
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: "author_id",
                    foreignField: "_id",
                    as: "author"
                }
            },
            {$unwind: {path: "$author", preserveNullAndEmptyArrays: true}},
            {
                $project: {
                    content: 0,
                    author: {
                        password: 0,
                        created_at: 0,
                        updated_at: 0,
                        description: 0,
                        last_name: 0,
                        _id: 0,
                    }

                }
            }
        ])

        res.send(posts)

    } catch (ex) {
        // res.send([])
    }
}

export const getTopHitsPosts = async (req: Request, res: Response) => {

    try {
        let p = await Post.aggregate([
            // { $match: { author_id: new ObjectId(author_id)}},
            {
                $lookup: {
                    from: "users",
                    localField: "author_id",
                    foreignField: "_id",
                    as: "author"
                }
            },
            {$unwind: {path: "$author", preserveNullAndEmptyArrays: true}},
            {
                $project: {
                    tags: 0,
                    author: {
                        _id: 0,
                        password: 0,
                        created_at: 0,
                        updated_at: 0,
                        description: 0,
                        email: 0
                    }
                }
            },
            {
                $lookup: {
                    from: "hits",
                    localField: "_id",
                    foreignField: "postId",
                    as: "hits"
                }
            },
            {$unwind: {path: "$hits", preserveNullAndEmptyArrays: true}},
            {
                $project: {
                    tags: 0,
                    content: 0,
                    hits: {
                        post_id: 0
                    }
                }
            },
            {
                $sort: {
                    'hits.count': -1
                }
            },
            {$limit: 10}
        ])
        response(res, 200, {posts: p})

    } catch (ex) {
        errorConsole(ex)
        saveLog(ex.message ? ex.message : "internal error")
        response(res, 500, ex.message)
    }
}

export const getPost = async (req: Request, res: Response) => {
    let {slug, post_id} = req.params
    try {
        let posts: any = [];
        if (!post_id) {
            return response(res, 404, "post not found")
        }

        posts = await Post.aggregate([
            // @ts-ignore
            {$match: {_id: new ObjectId(post_id)}},
            {
                $lookup: {
                    from: "users",
                    localField: "author_id",
                    foreignField: "_id",
                    as: "author"
                }
            },
            {$unwind: {path: "$author", preserveNullAndEmptyArrays: true}},
            {
                $lookup: {
                    from: "hits",
                    localField: "_id",
                    foreignField: "postId",
                    as: "hits"
                }
            },
            {$unwind: {path: "$hits", preserveNullAndEmptyArrays: true}},
            {
                $lookup: {
                    from: "likes",
                    localField: "_id",
                    foreignField: "post_id",
                    as: "like"
                }
            },
            {$unwind: {path: "$like", preserveNullAndEmptyArrays: true}},
            {$project: {htmlContent: 0}}
        ])

        await increasePostVisitorCount(post_id)
            .then(s => {
            })
            .catch(ex => {
            })


        if (posts.length > 0) {
            response(res, 200, {
                post: {
                    ...posts[0]
                }
            })
        } else {

            saveLog("post not found with id: " + post_id)
            response(res, 404, "post not found")
        }

    } catch (ex) {
        errorConsole(ex)
        saveLog(ex.message ? ex.message : "internal error")
        response(res, 500, ex.message)
    } finally {

    }

}

export const addPost = async (req: Request, res: Response) => {

    let {title, cover = "", htmlContent, tags, summary = ""} = req.body


    if (!htmlContent) {
        return response(res, 400, {message: "post not create because markdown content are empty"})
    }

    try {
        let slug = slugify(title, {
            replacement: "-",
            strict: true,
            lower: true,
            trim: true
        })

        if (!slug) {
            slug = shortid.generate()
        }

        let n = new Post({
            authorId: new ObjectId(req.user.userId) as any,
            slug,
            title,
            cover,
            tags: tags,
            summary,
            htmlContent: "",
            path: "",
        } as Post)


        let db = await Post.database
        const bucket = new mongodb.GridFSBucket(db, {bucketName: 'myCustomBucket'});

        const readableStream = new Readable();
        readableStream.push(htmlContent, "utf-8");
        readableStream.push(null);

        const uploadStream = bucket.openUploadStream(slug + '.txt');
        readableStream.pipe(uploadStream);

        readableStream.on("end", async () => {

            let r: any = await n.save()
            if (!r) {
                response(res, 409, "post create fail")
                return
            }

            // populated author...
            let user: any = await User.findOne({_id: new ObjectId(req.user.userId)}, {projection: {password: 0}})
            r.author = user
            response(res, 200, {post: r})

        })


    } catch (ex) {
        errorConsole(ex)
        saveLog(ex.message ? ex.message : "post create fail")
        response(res, 409, "post create fail")

    } finally {

    }

}


export const updatePost = async (req: Request, res: Response) => {


    let {_id, title, cover, summary, htmlContent, tags} = req.body

    let client;


    try {

        let doc: any = await Post.findOne({_id: new ObjectId(_id)})

        let post = doc

        if (post) {
            if (title) {
                post.title = title
            }
            if (summary) {
                post.summary = summary
            }
            if (tags) {
                post.tags = tags
            }
            if (cover) {
                post.cover = cover
            }

            if (!post.createAt) {
                post.createAt = new Date()
            }
            post.updatedAt = new Date()

            let isUpdated = await Post.findOneAndUpdate(
                {_id: new ObjectId(post._id)},
                {$set: post}
            )

            if (htmlContent) {

                let db = await Post.database
                const bucket = new mongodb.GridFSBucket(db, {bucketName: 'myCustomBucket'});

                const readableStream = new Readable();
                readableStream.push(htmlContent, "utf-8");
                readableStream.push(null);

                const uploadStream = bucket.openUploadStream(post.slug + '.txt');
                readableStream.pipe(uploadStream);
                readableStream.on("end", async () => {
                    response(res, 200, {post: post})
                })

                readableStream.on("error", () => {
                    response(res, 200, {post: post, message: "Post content update fail"})
                })
            }

        } else {
            console.log("asd")
            response(res, 404, "post Not found")
        }


    } catch (ex) {
        errorConsole(ex)
        saveLog(ex.message ? ex.message : "Internal Error. Please Try Again", req.url, req.method)
        response(res, 500, "Internal Error. Please Try Again")

    } finally {
        client?.close()
    }
}


export const searchPost = async (req: Request, res: Response) => {

    let {search} = req.query


    let postsSlug = []

    try {
        let db = await Post.database
        const bucket = new mongodb.GridFSBucket(db, {bucketName: 'myCustomBucket'});

        const searchRegex = new RegExp(search as string, "ig");

        let index = []
        const files = await bucket.find({}).toArray(); // filter to only search text files

        for (const file of files) {


            const stream = bucket.openDownloadStream(file._id);


            stream.on("error", (err) => {
                console.log(err)
            })



            stream.on('data', async (chunk) => {
                let content = chunk.toString();
                index.push("")
                if (searchRegex.test(content)) {
                    if (!postsSlug.includes(file.filename)) {
                        postsSlug.push(file.filename)
                        let slugc = file.filename.substring(0, file.filename.length - 4)
                        let post = await Post.findOne({slug: slugc})
                        if (post) {
                            res.write("----" + JSON.stringify(post))
                        }
                    }
                }
            });

            stream.on('end', async () => {

                if (files.length === index.length) {
                    console.log("end")
                    res.end()
                }
            });


        }


    } catch (ex) {
        res.send(ex.message)
    }
}


/**...............Implementation.............*/
function increasePostVisitorCount(post_id: string) {

    return new Promise(async (resolve, reject) => {
        try {
            let hit: any = await Hits.findOne({postId: new ObjectId(post_id)}, {})
            if (hit) {
                let doc = await Hits.update({_id: hit._id}, {
                    $inc: {count: 1}
                })
                resolve(doc)
            } else {
                let newHit = new Hits({
                    postId: new ObjectId(post_id), count: 1
                })

                let doc = await newHit.save()
                resolve(doc)
            }

        } catch (ex) {
            resolve(false)
        }
    })

    // let postHit = await client.HGET("post_hits", post.id)
    // if(postHit){
    //
    //   if(Number(postHit)) {
    //     let increase =  Number(postHit) + 1
    //     let isAdded = await client.HSET("post_hits", post.id, increase.toString())
    //     if(isAdded){
    //       // console.log("increase post visit")
    //     }
    //   } else {
    //     let isAdded = await client.HSET("post_hits", post.id, "1")
    //     if(isAdded){
    //       // console.log("increase post visit")
    //     }
    //   }
    //
    // } else {
    //   // create new one
    //   let isAdded = await client.HSET("post_hits", post.id, "1")
    //   if(isAdded){
    //     // console.log("increase post visit")
    //
    //   }
    // }

    //
    // let postHit = await client.HGET("post_hits", post.id)
    // if(postHit){
    //
    //   if(Number(postHit)) {
    //     let increase =  Number(postHit) + 1
    //     let isAdded = await client.HSET("post_hits", post.id, increase.toString())
    //     if(isAdded){
    //       // console.log("increase post visit")
    //     }
    //   } else {
    //     let isAdded = await client.HSET("post_hits", post.id, "1")
    //     if(isAdded){
    //       // console.log("increase post visit")
    //     }
    //   }
    //
    // } else {
    //   // create new one
    //   let isAdded = await client.HSET("post_hits", post.id, "1")
    //   if(isAdded){
    //     // console.log("increase post visit")
    //   }
    // }
}


export const getFileContent = async (req: Request, res: Response) => {
    // try{
    //   let mdContent = await downloadFile(req.body.path)
    //   res.send(mdContent)
    // } catch (ex){
    //   res.send(ex)
    // }
}

export const getPostContent = async (req: Request, res: Response) => {

    const {slug} = req.params


    try {

        let db = await Post.database
        const bucket = new mongodb.GridFSBucket(db, {bucketName: 'myCustomBucket'});

        let fileName = slug + '.txt'

        const downloadStream = bucket.openDownloadStreamByName(fileName);
        downloadStream.pipe(res);
        downloadStream.end()

        downloadStream.on("error", () => {
            res.end()
        })



    } catch (ex) {
        response(res, 500, ex.message)

    } finally {

    }
}

export const getRawPostContent = async (req: Request, res: Response) => {

    const {slug} = req.params

    try {

        let db = await Post.database
        const bucket = new mongodb.GridFSBucket(db, {bucketName: 'myCustomBucket'});

        let fileName = slug + '.txt'

        const downloadStream = bucket.openDownloadStreamByName(fileName);

        downloadStream.pipe(res);
        downloadStream.end()
        downloadStream.on("error", (msg) => {
            response(res, 500, {message: "File not found"})
        })

    } catch (ex) {
        response(res, 404, {message: ex.message})
    }
}


async function deleteMarkdownFile(filePath) {
    try {
        await rm(filePath)
        console.log("markdown file deleted...")
    } catch (ex) {
        console.log("markdown not found...")
        errorConsole(ex)
    }
}

function deletePostHandler(req: Request, res: Response) {
    return new Promise(async (resolve, reject) => {
        try {
            let doc = await Post.deleteOne({_id: new ObjectId(req.body._id)})
            if (doc) {
                // let mdFilePath = path.resolve(process.cwd() + "/" + req.body.path)
                response(res, 201, {id: req.body._id})
                // await deleteMarkdownFile(mdFilePath)
            } else {
                response(res, 404, "Post not found")
            }
        } catch (ex) {
            response(res, 500, "Post Delete fail")
        }
    })
}


export const deletePost = async (req: Request, res: Response) => {
    let {adminId} = req.body
    try {
        if (adminId) {
            let admin = await User.findOne({_id: new ObjectId(adminId), role: "admin"})
            if (admin) {
                await deletePostHandler(req, res)
                // await deleteAdminPostIntoCache("admin_posts", req.body._id)
            }
        } else {

            await deletePostHandler(req, res)

            // let admin = await User.findOne({_id: new ObjectId(req.user_id), role: "admin"})
        }

    } catch (ex) {
        response(res, 500, "Post Delete fail")
    } finally {

    }
}

export const handleToggleLike = async (req: Request, res: Response) => {
    const {post_id, user_id} = req.body

    let client;
    try {
        response(res, 500, "Please try again")
        // client = await redisConnect()
        // let postStr = await client.HGET("posts", post_id)
        // if(postStr){
        //   let post = JSON.parse(postStr)
        //   if(post.likes) {
        //     let idx = post.likes && post.likes.indexOf(user_id)
        //     if (idx === -1) {
        //       post.likes && post.likes.push(user_id)
        //     } else {
        //       post.likes && post.likes.splice(idx, 1)
        //     }
        //   } else {
        //     post.likes = [user_id]
        //   }
        //
        //   let doc = await client.HSET("posts", post_id, JSON.stringify(post))
        //   if(doc === 0 || doc) {
        //     response(res, 201, {message: "Like Action Success", post: post})
        //   } else {
        //     response(res, 500, "Post Action fail")
        //   }
        // }

    } catch (ex) {
        response(res, 500, "Post Delete fail")

    } finally {
        client?.quit()
    }
}


