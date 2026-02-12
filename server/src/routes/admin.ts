import { Router } from "express";
import { createProduct } from "../controllers/product.controller.js";
import { createAdminUser } from "../controllers/user.controller.js";

const adminRouter = Router();

adminRouter.post("/create", createAdminUser);
// adminRouter.get("/products/", getProductsAdmin);
adminRouter.post("/products/create", createProduct);
// adminRouter.post("/products/:id/edit", editProduct);
// adminRouter.post("/products/:id/remove", removeProduct);

export default adminRouter;
