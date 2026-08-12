import { Router } from "express";
import WalletController from "./wallet.controller";


const router = Router();
const walletController = new WalletController();


router.get("/", (req, res) => walletController.getWallet(req, res));
router.post("/", (req, res) => walletController.createWallet(req, res));
router.put("/", (req, res) => walletController.updateWallet(req, res));

export default router;