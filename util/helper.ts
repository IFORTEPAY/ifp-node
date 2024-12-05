/** STORE GLOBAL HELPER */

import { sha256 } from "js-sha256";

export const generateAuth = (merchantId: string, unbound: string): string => {
  const str = merchantId + ":" + unbound;
  const buff = Buffer.from(str);
  const encoded = buff.toString("base64");
  const auth = `Basic ${encoded}`;
  return auth;
};

export const generateSignature = (
  externalId: string,
  orderId: string,
  hashKey: string,
): string => {
  if (!externalId || !orderId) return "";
  return sha256(hashKey + externalId + orderId);
};
