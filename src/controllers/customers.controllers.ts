import customerService from "../services/customers.service";
import { Response, Request } from "express";

const createCustomerController = async (req: Request, res: Response) => {
  const data = await customerService.createCustomer(req.body);
  res.status(data.statusCode).json(data);
};

const createServiceController = async (req: Request, res: Response) => {
  const data = await customerService.createService(req.body);
  res.status(data.statusCode).json(data);
};

export default {
  createCustomerController,
  createServiceController,
};
