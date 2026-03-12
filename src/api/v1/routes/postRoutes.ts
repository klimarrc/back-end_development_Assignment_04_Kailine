import express from "express";
import {
    createPostHandler,
} from "../controllers/postController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: express.Router = express.Router();

router.post(
    "/posts",
    authenticate,
    isAuthorized({ hasRole: [] }),
    createPostHandler
);

// router.get("/posts", authenticate, getPostsHandler);

// router.get("/posts/:id", authenticate, getPostByIdHandler);

// router.put(
//     "/posts/:id",
//     authenticate,
//     isAuthorized({ hasRole: ["admin", "manager"], allowSameUser: true }),
//     updatePostHandler
// );

// router.delete(
//     "/posts/:id",
//     authenticate,
//     isAuthorized({ hasRole: ["admin", "manager"] }),
//     deletePostHandler
// );

export default router;
