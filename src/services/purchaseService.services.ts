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

const refundTransaction = async (transactionId: string) => {
  try {
    // Check if the transaction exists by the Id
    const transaction = await Transaction.findById(transactionId)
      .populate("customerId")
      .populate("serviceId");

    // If the transaction doesn't exist or is not completed, return an error message
    if (!transaction || transaction.status !== "Completed") {
      return responses.failureMessage("This shouldn't be refunded", 400);
    }

    transaction.status = "Refunded";
    transaction.refundDate = new Date();
    await transaction.save();

    return responses.successMessage("You will be refunded", 200, transaction);
  } catch (error) {
    return responses.failureMessage(
      "An error occurred while processing the refund.",
      500
    );
  }
};

const cancelTransaction = async (transactionId: string) => {
  try {
    // Check if the transaction exists by the Id
    const transaction = await Transaction.findById(transactionId)
      .populate("customerId")
      .populate("serviceId");

    // If the transaction doesn't exist or is not completed, return an error message
    if (!transaction || transaction.status !== "Completed") {
      return responses.failureMessage("This cannot be cancelled", 400);
    }

    transaction.status = "Cancelled";
    await transaction.save();

    return responses.successMessage(
      "Your order has been canceleld successfully",
      200,
      transaction
    );
  } catch (error) {
    console.error("There was an error", error);
    return responses.failureMessage("Unable to cancell the order", 500);
  }
};

const allTransactions = async (customerId: string, transactionId: string) => {
  try {
    if (transactionId) {
      const transaction = await Transaction.findById(transactionId)
        .populate("customerId")
        .populate("serviceId");

      if (!transaction) {
        return responses.failureMessage("Transaction not found", 404);
      }
      return responses.successMessage("Transactions", 200, transaction);
    }

    // find the transactions for each user
    else if (customerId) {
      const transactions = await Transaction.find({ customerId }).populate(
        "serviceId"
      );

      return responses.successMessage(
        "Customer transactions",
        200,
        transactions
      );
    }

    // return an error is blank
    else {
      return responses.failureMessage(
        "Please provide a customerId or transactionId",
        400
      );
    }
  } catch (error) {
    console.error("There was an error", error);
    return responses.failureMessage("Unable to get all transactions", 500);
  }
};

export default {
  createTransaction,
  refundTransaction,
  cancelTransaction,
  allTransactions,
};
