
import getAuthID from "../middlewares/getAuthID"

import controller from "../controllers"

// import {deletePost, getTopHitsPosts} from "../controllers/postController";


const postRoutes = (app)=>{
  
  app.get("/api/test", controller.postController.getP);
  app.get("/api/posts", controller.postController.getPosts);

  // filter posts
  app.post("/api/filter-posts", controller.postController.filterPosts);

  app.get("/api/posts/hits", controller.postController.getTopHitsPosts);

  app.get("/api/posts/:post_id", controller.postController.getPost)
  app.post("/api/post/update-post", getAuthID, controller.postController.updatePost)
  app.post("/api/post/add-post", getAuthID, controller.postController.addPost)
  app.post("/api/posts/delete", getAuthID, controller.postController.deletePost)
  app.get("/api/post/:slug", controller.postController.getPost)


  app.post("/api/markdown/content", controller.postController.getPostContent)

  // body => { path: string }
  app.post("/api/raw-md-content", controller.postController.getRawMarkdownContent)

  app.post("/api/toggle-like", getAuthID, controller.postController.handleToggleLike)


  app.post("/api/comment", getAuthID, controller.commentController.createComment)


  // ?post_id=1&comment_id=1
  app.delete("/api/comment", getAuthID, controller.commentController.deleteComment)

  app.post("/api/file-content", controller.postController.getFileContent)
  }
  
  
  export default postRoutes
  