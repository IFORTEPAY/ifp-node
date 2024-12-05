import { ApiResponse } from "./type";

export function sendInternalServerError<T>(err: Error): ApiResponse<T> {
  return {
    response_code: "98",
    response_message: "internal server error",
    error: err.message,
  };
}
