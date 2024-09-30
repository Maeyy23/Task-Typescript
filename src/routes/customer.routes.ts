import express, { Router } from "express";
import customerController from "../controllers/customers.controllers";

const router: Router = express.Router();

router.post("/create-user", customerController.createCustomerController);
router.post("/create-service", customerController.createServiceController);

export default router;
