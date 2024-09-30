import Customer from "../models/customer.model";
import Service from "../models/service.model";
import responses from "../utils/responses";
import { ICustomer, IService } from "../@types/types";

const createCustomer = async (payload: ICustomer) => {
  try {
    const user = await Customer.findOne({ email: payload.email });
    if (user) {
      return responses.failureMessage("This email is already taken", 400);
    }

    const newUser = await Customer.create(payload);
    return responses.successMessage("Welcome onboard", 201, newUser);
  } catch (error) {
    console.error("There was an error", error);
    return responses.failureMessage("Unable to create a new user", 500);
  }
};

const createService = async (payload: IService) => {
  try {
    await Service.create(payload);
    return responses.successMessage("Saved successfully", 201);
  } catch (error) {
    console.error("There was an error", error);
    return responses.failureMessage("Unable to create the service", 500);
  }
};

export default {
  createCustomer,
  createService,
};
