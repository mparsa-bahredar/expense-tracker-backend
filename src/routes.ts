import { Router } from "express";
import signupRoutes from "../src/modules/auth/signup/signup.routes"
import signinRoutes from "../src/modules/auth/signin/signin.routes"
import forgotPasswordRoutes from "../src/modules/auth/forgotPassword/forgotPassword.routes"
import usersRoutes from "../src/modules/users/users.routes"
import walletRoutes from "../src/modules/wallet/wallet.router"
import categoriesRoutes from "../src/modules/categories/categories.routes"
import transactionsRoutes from "../src/modules/transactions/transactions.routes"


const router = Router();

router.use("/auth", signupRoutes);
router.use("/auth", signinRoutes);
router.use("/auth", forgotPasswordRoutes);

router.use("/users", usersRoutes);

router.use("/wallet", walletRoutes);

router.use("/categories", categoriesRoutes);

router.use("/transactions", transactionsRoutes);


export default router;