import { Router } from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import {
  createAdminUser,
  deleteUserAdmin,
} from "../controllers/user.controller.js";

const adminRouter = Router();

adminRouter.post("/create", createAdminUser);
// adminRouter.get("/products", getProductsAdmin);
adminRouter.post("/products/create", createProduct);
adminRouter.post("/products/:id/edit", updateProduct);
adminRouter.post("/products/:id/delete", deleteProduct);
// adminRouter.get("/users", getUsersAdmin);
// adminRouter.post("/users/:id/edit", updateUserAdmin);
adminRouter.post("/users/:id/delete", deleteUserAdmin);

export default adminRouter;
