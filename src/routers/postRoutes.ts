import getAuthID from "../middlewares/getAuthID"
import controller from "../controllers"

import express from "express";

const router = express.Router()


router.get("/test", controller.postController.getP);
router.get("/posts", controller.postController.getPosts);


// filter posts
router.post("/filter-posts", controller.postController.filterPosts);

router.get("/posts/hits", controller.postController.getTopHitsPosts);

router.get("/posts/:post_id", controller.postController.getPost)
router.post("/post/update-post", getAuthID, controller.postController.updatePost)
router.post("/post/add-post", getAuthID, controller.postController.addPost)
router.post("/posts/delete", getAuthID, controller.postController.deletePost)
router.get("/post/:slug", controller.postController.getPost)


router.post("/markdown/content", controller.postController.getPostContent)

// body => { path: string }
router.post("/raw-md-content", controller.postController.getRawMarkdownContent)

router.post("/post/get-likes", controller.likeController.getLikes)
router.post("/post/add-like", getAuthID, controller.likeController.addLike)
router.post("/post/remove-like", getAuthID, controller.likeController.removeLike)


router.post("/post/add-comment", getAuthID, controller.commentController.createComment)
router.post("/post/add-comment-reaction", getAuthID, controller.commentController.addCommentReaction)
router.post("/post/remove-comment-reaction", getAuthID, controller.commentController.removeCommentReaction)

router.post("/post/fetch-comments", controller.commentController.findComments)

router.post("/post/delete-comment", getAuthID, controller.commentController.deleteComment)

router.post("/file-content", controller.postController.getFileContent)


export default router
  