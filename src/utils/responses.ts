const successMessage = async (
  message: string,
  statusCode: number,
  data?: any
) => {
  return {
    message,
    statusCode,
    status: "success",
    data,
  };
};

const failureMessage = async (message: string, statusCode: number) => {
  return {
    message,
    statusCode,
    status: "failure",
  };
};

export default {
  successMessage,
  failureMessage,
};
