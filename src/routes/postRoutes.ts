import getAuthID from "../middlewares/getAuthID"
import controller from "../controllers"

import express from "express";
import {getPostContent} from "../controllers/postController";

const router: any = express.Router()


router.get("/posts/search", controller.postController.searchPost)

router.get("/test", controller.postController.getP);
router.get("/posts", controller.postController.getPosts);

router.get("/posts/content/:slug", getPostContent)

// filter posts
router.post("/filter-posts", controller.postController.filterPosts);

router.get("/posts/hits", controller.postController.getTopHitsPosts);

router.get("/posts/:post_id", controller.postController.getPost)
router.post("/posts/update-post",  controller.postController.updatePost)
router.post("/posts/add-post", getAuthID, controller.postController.addPost)
router.post("/posts/delete", getAuthID, controller.postController.deletePost)
router.get("/post/:slug", controller.postController.getPost)







// body => { path: string }
router.get("/raw-post-content", controller.postController.getRawPostContent)

router.post("/post/get-likes", controller.likeController.getLikes)
router.post("/post/add-like", getAuthID, controller.likeController.addLike)
router.post("/post/remove-like", getAuthID, controller.likeController.removeLike)

//
// router.post("/post/add-comment", getAuthID, controller.commentController.createComment)
// router.post("/post/add-comment-reaction", getAuthID, controller.commentController.addCommentReaction)
// router.post("/post/remove-comment-reaction", getAuthID, controller.commentController.removeCommentReaction)
//
// router.post("/post/fetch-comments", controller.commentController.findComments)
//
// router.post("/post/delete-comment", getAuthID, controller.commentController.deleteComment)
//
// router.post("/file-content", controller.postController.getFileContent)


export default router
  