import { IncomingHttpHeaders } from "http";

export const getBearer = (headers: IncomingHttpHeaders): string => {
  if (
    !Object.hasOwn(headers, "authorization") ||
    headers.authorization === undefined
  ) {
    return "";
  }

  return headers.authorization.substring(7);
};
