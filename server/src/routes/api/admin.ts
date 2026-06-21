import { Router } from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  createAdminUser,
  deleteUserAdmin,
} from "#controllers";

const adminRouter = Router();

adminRouter.post("/create", createAdminUser);
// adminRouter.get("/products", getProductsAdmin);
adminRouter.post("/products", createProduct);
adminRouter.patch("/products/:id", updateProduct);
adminRouter.delete("/products/:id", deleteProduct);
// adminRouter.get("/users", getUsersAdmin);
// adminRouter.patch("/users/:id", updateUserAdmin);
adminRouter.delete("/users/:id", deleteUserAdmin);

export default adminRouter;
