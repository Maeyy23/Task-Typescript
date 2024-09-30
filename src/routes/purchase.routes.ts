import express, { Router } from "express";
import purchaseController from "../controllers/purchase.controller";

const router: Router = express.Router();

router.post("/create", purchaseController.createTransactionController);

router.get("/transactions", purchaseController.allTransactionsController);

router.put(
  "/refund/:transactionId",
  purchaseController.refundTransactionController
);

router.put(
  "/cancel/:transactionId",
  purchaseController.cancelTransactionController
);

export default router;
