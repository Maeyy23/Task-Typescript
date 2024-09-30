import Service from "../models/service.model";
import Transaction from "../models/transaction.model";
import Customer from "../models/customer.model";
import { ITransaction } from "../@types/types";
import responses from "../utils/responses";

const createTransaction = async (payload: ITransaction) => {
  try {
    const { customerId, serviceId, amount } = payload;
    // Check if a customer exists in the database before proceeding to order a service

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return responses.failureMessage(
        "You are not signed up to our platform yet",
        404
      );
    }

    // confirm that the service is being rendered
    const service = await Service.findById(serviceId);
    if (!service) {
      return responses.failureMessage("Sorry we do not do that", 404);
    }

    // check if the transaction amount matches the price for service
    if (service.price !== amount) {
      return responses.failureMessage(
        "Your amount does not match the service price.",
        400
      );
    }

    // Make the Purchase/Transaction
    const purchase = new Transaction({ customerId, serviceId, amount });
    await purchase.save();

    return responses.successMessage(
      "Your order was made successfully",
      200,
      purchase
    );
  } catch (error) {
    console.error("There was an error", error);
    return responses.failureMessage("Unable to Create a transaction", 500);
  }
};

export default {
  createTransaction,
};
