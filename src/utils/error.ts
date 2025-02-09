import { ValidationError } from "yup";

export type ErrorResponse = {
  success: false;
  errors: Array<string>;
};

const isNodeError = (error: any): error is NodeJS.ErrnoException => {
  return error instanceof Error && "code" in error;
};

const handleMySqlError = (error: any): string => {
  if (isNodeError(error)) {
    switch (error.code) {
      case "ER_DUP_ENTRY":
        return "This entry already exists";
      default: {
        console.log(error);
        return error.message;
      }
    }
  }
  console.log(error);
  return "Unknown Error Occurred";
};

export const handleError = (error: unknown): ErrorResponse => {
  if (error instanceof ValidationError) {
    return {
      success: false,
      errors: error.errors,
    };
  }

  if (error instanceof Error) {
    const message = handleMySqlError(error);

    return {
      success: false,
      errors: [message],
    };
  }
  console.log(error, "HERE");
  return {
    success: false,
    errors: ["Unknown Error Occurred"],
  };
};
