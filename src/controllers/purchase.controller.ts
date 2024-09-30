import purchaseServices from "../services/purchaseService.services";
import { Response, Request } from "express";

const createTransactionController = async (req: Request, res: Response) => {
  const data = await purchaseServices.createTransaction(req.body);
  res.status(data.statusCode).json(data);
};

const refundTransactionController = async (req: Request, res: Response) => {
  const { transactionId } = req.params;
  const data = await purchaseServices.refundTransaction(transactionId);
  res.status(data.statusCode).json(data);
};

const cancelTransactionController = async (req: Request, res: Response) => {
  const { transactionId } = req.params;
  const data = await purchaseServices.cancelTransaction(transactionId);
  res.status(data.statusCode).json(data);
};

const allTransactionsController = async (req: Request, res: Response) => {
  const { customerId, transactionId } = req.query;
  const data = await purchaseServices.allTransactions(
    customerId as string,
    transactionId as string
  );
  res.status(data.statusCode).json(data);
};

export default {
  createTransactionController,
  refundTransactionController,
  cancelTransactionController,
  allTransactionsController,
};
