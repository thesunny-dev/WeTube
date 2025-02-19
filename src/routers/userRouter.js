import express from "express";
import { deleteUser, profile,startGithubLogin,finishGithubLogin, getEditUser, postEditUser, reauth } from "../controllers/userControllers.js";
import { protectorMiddleware, publicOnlyMiddleware, avatarUpload } from "../middlewares.js";

/* base URL : /users/ */
const userRouter = express.Router();

userRouter.route("/github/login").all(publicOnlyMiddleware).get(startGithubLogin);
userRouter.route("/github/finLogin").all(publicOnlyMiddleware).get(finishGithubLogin); //이 url은 https://github.com/settings/developers 에서 지정
userRouter.route("/:userId/edit").all(protectorMiddleware).get(getEditUser).post(avatarUpload.single("avatarUrl"),postEditUser);
userRouter.get("/:userId/profile",profile);
userRouter.route("/reauth").all(publicOnlyMiddleware).post(reauth);
userRouter.route("/:userId/delete").all(protectorMiddleware).get(deleteUser);

export default userRouter;