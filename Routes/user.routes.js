import { Router } from "express";
import { deleteUser, getSingleUser, getUsers, updateUser } from "../controllers/user.controllers.js";
import authorize from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/isAdmin.middleware.js";

const userRouter = Router();

// GET /api/v1/users/
userRouter.get("/", authorize,isAdmin, getUsers);

// GET /api/v1/users/:id
userRouter.get("/:id",authorize,getSingleUser);

// POST /api/v1/users/
userRouter.post("/", (req, res, next) => {
  res.send({ title: "create user" });
});

// PUT /api/v1/users/:id
userRouter.put("/:id", authorize,updateUser);

// DELETE /api/v1/users/:id
userRouter.delete("/:id",authorize,isAdmin,deleteUser);

export default userRouter;
